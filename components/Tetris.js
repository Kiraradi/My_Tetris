import { createElementByTag, checkingNumber } from "../services/serveces.js";
import WindowNextShape from "./WindowNextShape.js";
import Shapes from "./Shapes.js";
import Pocket from "./Pocket.js";

const Tetris = class {
    rowsInField = 20;
    columnsInField = 10;
    field = null;
    score = 0;
    currentShape = null;
    nextShape = null;
    tetrisFieldElem = null;
    maxSpeed = 1000;
    minSpeed = 100;
    currentLevel = 1;
    pocket = null;

    constructor() {        
    }

    drowUI(wrapperComponent) {
        const tetrisElem = document.getElementById('tetris');
        this.tetrisFieldWrapperElem = createElementByTag('div', 'tetrisfield_wrapper');

        this.tetrisFieldElem = createElementByTag('div', 'tetrisfield');

        this.tetrisFieldWrapperElem.append(this.tetrisFieldElem);

        this.gameOverElem = document.getElementById('game_over');

        const additionalFieldsWrapper = createElementByTag('div', 'additional_fields_wrapper');

        this.tetrisFieldWrapperElem.append(additionalFieldsWrapper);

        this.scoreElem = document.getElementById('score');
        this.recordElem = document.getElementById('record');
        this.recordElem.textContent = `Рекорд: ${this.getRecord()}`;

        this.levelElem = document.getElementById('level');

        this.nextShape = new WindowNextShape(additionalFieldsWrapper);
        this.pocket = new Pocket(additionalFieldsWrapper);

        this.drowUiMenu(tetrisElem);

        tetrisElem.append(this.tetrisFieldWrapperElem);

        this.initField();
        this.drowField();
        wrapperComponent.append(tetrisElem);

        this.subscribeToEvents();
    }

    drowUiMenu(container) {
        const menuElem = document.getElementById('menu');

        let menuIsOpen = false;

        const buttonOpenInputElem = createElementByTag('button', 'button menu_button_openInput', 'Открыть меню');

        menuElem.append(buttonOpenInputElem);

        const labelMenuElem = createElementByTag('label', 'menu_label', 'Введите уровень от 1 до 10');

        const inputMenuElem = createElementByTag('input', 'menu_input', '', 'type', 'number');
        inputMenuElem.setAttribute('placeholder', 'Например: 2');

        const buttonStartElem = createElementByTag('button', 'button menu_button_start', 'Начать');

        labelMenuElem.append(inputMenuElem);
        labelMenuElem.append(buttonStartElem);

        menuElem.append(labelMenuElem);

        container.append(menuElem);

        const toggleTextOnButton = () => {
            buttonOpenInputElem.textContent = menuIsOpen ? 'Закрыть меню' : 'Открыть меню';
        }

        buttonOpenInputElem.addEventListener('click', (event) => {
            event.preventDefault();
            labelMenuElem.classList.toggle('open');
            menuIsOpen = !menuIsOpen
            toggleTextOnButton()
        })

        buttonStartElem.addEventListener('click', (event) => {
            event.preventDefault();

            const newLevel = inputMenuElem.value;

            if (newLevel) {
                this.currentLevel = checkingNumber(Number(newLevel), 1, 10);
                inputMenuElem.value = ''
            }

            this.startGame();

            if (this.currentShape) {
                buttonStartElem.textContent = 'Новая игра';
            }
        })
    }

    drowField() {
        this.tetrisFieldElem.innerHTML = '';

        this.field.forEach(column => {
            const rowElem = createElementByTag('div', 'row');
            column.forEach(cell => {
                const className = cell ? 'cell full_cell' : `cell`
                const cellElem = createElementByTag('div', className);
                rowElem.append(cellElem);
            })

            this.tetrisFieldElem.append(rowElem);
        })
    }

    startGame() {
        this.initField();
        this.gameOverElem.classList.remove('game_over_active');

        this.scoreElem.textContent = `Ваш счет: ${this.score}`;

        this.setNewShape(this.startPositionForNewShapes);

        if (this.initField) {
            clearInterval(this.initField);
        }
        this.setInterval();
        this.reRender();
    }

    initField() {
        this.field = Array.from({ length: this.rowsInField }, () => Array.from({ length: this.columnsInField }, () => 0));
        this.startPositionForNewShapes = { x: 0, y: Math.floor(this.field[0].length / 2) - 1 };
    }

    reRender() {
        this.currentShape.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0) {
                if (this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] === 0 && pixel.pixelContent === 1) {
                    this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] = pixel.pixelContent;
                }
            }
        });

        this.drowField();
    }

    deleteLastPositionShape() {
        this.currentShape.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0 && pixel.pixelContent === 1) {
                this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] = 0;
            }
        });
    }

    onStepDown() {
        if (this.isShapeAtBottom()) {
            this.initNewShape();
        } else {            
            this.deleteLastPositionShape();
            this.currentShape.stepDown(this.field.length - 1);
            this.finishGameMove();
            this.reRender();
        }
    }

    onStepLeft() {
        const isLeftAvailable = this.checkLeftOffset();
        if (!isLeftAvailable)  return;

        this.deleteLastPositionShape();
        this.currentShape.stepLeft();
        this.reRender();
    }

    onStepRight() {
        if (this.checkRightOffset()) {
            this.deleteLastPositionShape();
            this.currentShape.stepRight(this.field[0].length - 1);
            this.reRender();
        }
    }

    onShapeRotation() {
        this.deleteLastPositionShape();
        this.currentShape.setNewRotation();
        this.reRender();
    }

    initNewShape() {
        const isStatPositionAvailable = this.field[this.startPositionForNewShapes.x][this.startPositionForNewShapes.y] === 0;
        const isPositionAfterStartAvailable = this.field[this.startPositionForNewShapes.x + 1][this.startPositionForNewShapes.y] === 0;

        if (isStatPositionAvailable && isPositionAfterStartAvailable) {
            this.setNewShape();
            return
        }
            
        this.gameOver();
    }

    setNextShape() {
        const startPosition = { x: 3, y: 0 };
        this.nextShape.installNextShape(new Shapes(startPosition));
    }

    setNewShape() {
        if (this.nextShape.nextShape) {
            this.currentShape = this.nextShape.nextShape;
            this.currentShape.reposition(this.startPositionForNewShapes);
            this.setNextShape();

        } else {
            this.currentShape = new Shapes(this.startPositionForNewShapes);
            this.setNextShape();

        }
        this.currentShape.canItInstall = this.canItInstall.bind(this);
    }

    isShapeAtBottom() {
        const arrayOfFullCells = this.currentShape.findFilledCellsAtBottom();

        return !arrayOfFullCells.every((pixel) => {
            const nextPositionX = pixel.pixelPosition.x + 1;
            const nextPositionY = pixel.pixelPosition.y;
            if (nextPositionX > this.rowsInField - 1)  return false;
            
            if (nextPositionX < 0)  return true;

            const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;
            return isCellAvailable;                            
            }
        );
    }

    checkLeftOffset() {
        const arrayOfFullCells = this.currentShape.findFilledCellsOnLeft();

        return arrayOfFullCells.every((pixel) => {
            const nextPositionX = pixel.pixelPosition.x;
            const nextPositionY = pixel.pixelPosition.y - 1;
            
            if (nextPositionY < 0)  return true;

            if (this.field[nextPositionX] === undefined) return true

            const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;

            return isCellAvailable;                            
            }
        );
    }

    checkRightOffset() {
        const arrayOfFullCells = this.currentShape.findFilledCellsOnRight();

        return arrayOfFullCells.every((pixel) => {
            const nextPositionX = pixel.pixelPosition.x;
            const nextPositionY = pixel.pixelPosition.y + 1;
            
            if (nextPositionY < 0)  return true;

            if (this.field[nextPositionX] === undefined) return true

            const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;

            return isCellAvailable;                            
            }
        );
    }

    getRecord() {
        const record = window.localStorage.getItem('record');
        return record ? Number(record) : 0
    }

    setRecord() {
        const record = this.getRecord();

        if (record < this.score) window.localStorage.setItem('record', this.score)

        this.recordElem.textContent = `Рекорд: ${record}`;
    }

    finishGameMove() {
        const newField = this.field.filter(row => row.some(pixel => pixel === 0));

        while (newField.length !== this.rowsInField) {
            newField.unshift(Array.from({ length: this.columnsInField }, () => 0));
            this.increaseScores();
            this.checkLevel();
        }

        this.field = newField;
        this.reRender();
    }

    increaseScores() {
        this.score += 10;
        this.scoreElem.textContent = `Ваш счет: ${this.score}`;
        this.setRecord();
    }

    checkLevel() {
        if (this.score % 30 !== 0) return;

        this.currentLevel++;
        this.currentLevel > 10 ? this.currentLevel = 10 : null
        this.levelUp();        
    }

    canItInstall(newShape) {
        return newShape.flat().every(pixel => {
            const isPositionAvailable = this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] >= 0 && this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] + pixel.pixelContent < 2;
            return isPositionAvailable;
        });
    }

    gameOver() {
        this.setRecord();
        clearInterval(this.intervalId);
        this.gameOverElem.classList.add('game_over_active');
        this.currentShape = null;
        this.score = 0;
        this.currentLevel = 1;
        this.initField();
        this.drowField();
    }

    setInterval() {
        this.levelElem.textContent = `Уровень: ${this.currentLevel}`;

        let newSpeed = (this.maxSpeed - this.currentLevel * this.minSpeed) + this.minSpeed;

        newSpeed = newSpeed >= 100 ? newSpeed : 100;

        this.intervalId = setInterval(() => {
            this.onStepDown();
        }, newSpeed)
    }

    levelUp() {
        clearInterval(this.intervalId);

        this.setInterval();
    }

    getShapeFromPocket() {
        if(this.pocket.shapeInPocket) {
            this.replaseShapeFromPocket();
        } else {
            this.setShapeInPocket();
        }
    }

    setShapeInPocket() {
        this.deleteLastPositionShape();
        this.pocket.installShapeInPocket(this.currentShape);
        this.setNewShape();
        this.reRender();
    }

    replaseShapeFromPocket() {
        this.deleteLastPositionShape();
        const copyCurrentShape = this.currentShape;

        const startPositionOnField = this.currentShape.getStartPositionCurrentShape();

        this.currentShape = this.pocket.shapeInPocket;

        this.currentShape.reposition(startPositionOnField);

        if (this.canItInstall(this.currentShape.shape)) {

            this.pocket.installShapeInPocket(copyCurrentShape);

            this.reRender();
            return;
        }

        this.currentShape = copyCurrentShape;
    }

    subscribeToEvents() {
        document.addEventListener('keydown', (event) => {
            if (!this.currentShape) return;
            switch (event.code) {
                case 'ArrowDown':
                    this.onStepDown();
                    break;
                case 'ArrowLeft':
                    this.onStepLeft();
                    break;
                case 'ArrowRight':
                    this.onStepRight();
                    break;
                case 'ArrowUp':
                    this.onShapeRotation();
                    break;
                case 'Numpad0':
                    this.getShapeFromPocket();
                    break;
            }
        })
    }
}

export default Tetris;