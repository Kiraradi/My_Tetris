import { createElementByTag, checkingNumber } from "../services/serveces.js";
import WindowNextShape from "./WindowNextShape.js";
import Shapes from "./Shapes.js";

const Tetris = class {
    constructor() {
        this.rowsInField = 20;
        this.columnsInField = 10;
        this.field = null;
        this.score = 0;
        this.currentShape = null;
        this.nextShape = null;
        this.tetrisFieldElem = null;
        this.speed = 1000;
        this.currentLevel = 1;
    }

    drowUI(wrapperComponent) {
        const tetrisElem = createElementByTag('div', 'tetris');
        this.tetrisFieldWrapperElem = createElementByTag('div','tetrisfield_wrapper');

        this.tetrisFieldElem = createElementByTag('div', 'tetrisfield');

        this.tetrisFieldWrapperElem.append(this.tetrisFieldElem);

        this.gameOverElem =  createElementByTag('h1', 'game_over', `GAME OVER`);

        tetrisElem.append(this.gameOverElem);   

        this.scoreElem =  createElementByTag('h2', 'score', `Ваш счет: ${this.score}`);
        this.recordElem = createElementByTag('h2','score', `Рекорд: ${this.getRecord()}`);
        this.levelElem = createElementByTag('h2','score', `Уровень: ${this.currentLevel}`);

        const headerElem = createElementByTag('div', 'header');

        headerElem.append(this.scoreElem);        
        headerElem.append(this.levelElem);
        headerElem.append(this.recordElem);

        this.nextShape = new WindowNextShape(this.tetrisFieldWrapperElem)

        this.drowUiMenu(tetrisElem);

        tetrisElem.append(headerElem);    

        tetrisElem.append(this.tetrisFieldWrapperElem);

        this.initField();
        this.drowField();
        wrapperComponent.append(tetrisElem);

        this.subscribeToEvents();
    }

    drowUiMenu(container) {
        const menuElem = createElementByTag('form', 'menu');

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

            if(this.currentShape) {
                buttonStartElem.textContent = 'Новая игра';
            }
        })
    }

    drowField() {
        this.tetrisFieldElem.innerHTML = '';

        this.field.forEach(column => {
            const rowElem = createElementByTag('div', 'row');
            column.forEach(cell => {
                const className = cell ? 'cell full_cell': `cell`
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
        this.field = Array.from({length: this.rowsInField},() => Array.from({length:this.columnsInField}, () => 0));
        this.startPositionForNewShapes = {x:0, y: Math.floor(this.field[0].length / 2) - 1};
    }

    reRender() {
        this.currentShape.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0) {
                if(this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] === 0 && pixel.pixelContent === 1) {
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
            this.deleteLastPositionShape();
            this.currentShape.stepDown(this.field.length - 1);
            this.deleteFilledRows();
            this.reRender();
        } else {
            this.initNewShape();
        }
    }

    onStepLeft() {
        const isLeftAvailable = this.checkLeftOffset();
        if (!isLeftAvailable) {
            return;
        }

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
        const isPlaceAvailable = this.field[this.startPositionForNewShapes.x][this.startPositionForNewShapes.y] === 0 && this.field[this.startPositionForNewShapes.x + 1][this.startPositionForNewShapes.y] === 0
        if(isPlaceAvailable) {
            this.setNewShape();            
        } else {
            this.gameOver();
        } 
    }

    setNextShape() {
        const startPosition = {x: 3, y: 0};
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
        this.currentShape.canItRotate = this.canItRotate.bind(this);
    }

    isShapeAtBottom() {
        const arrayOfFullCells = this.currentShape.findFilledCellsAtBottom();        

        const verificationArray = arrayOfFullCells.reduce((acc, pixel) => {
            const nextPositionX = pixel.pixelPosition.x + 1;
            const nextPositionY = pixel.pixelPosition.y;
            if (nextPositionX > this.rowsInField - 1) {
                acc.push(false);
            } else {
                if(nextPositionX < 0) {
                    acc.push(true);
                } else {
                    const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;

                    acc.push(isCellAvailable); 
                }
            }

            return acc;
        }, []);

        return verificationArray.every(el => el === true)
     }

    checkLeftOffset() {
        const arrayOfFullCells = this.currentShape.findFilledCellsOnLeft(); 

        const verificationArray = arrayOfFullCells.reduce((acc, pixel) => {
            const nextPositionX = pixel.pixelPosition.x;
            const nextPositionY = pixel.pixelPosition.y - 1;

            if (nextPositionY < 0) {
                acc.push(false);
            } else {
                if (this.field[nextPositionX] === undefined) {
                    acc.push(true)
                } else {
                    const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;
                    acc.push(isCellAvailable); 
                }                
            }

            return acc;
        }, [])

        return verificationArray.every(el => el === true)
    }

    getRecord() {
        const record = window.localStorage.getItem('record');
        return record ? Number(record) : 0
    }

    setRecord() {
        this.getRecord() < this.score ? window.localStorage.setItem('record', this.score) : null

         this.recordElem.textContent = `Рекорд: ${this.getRecord()}`;
    }

    deleteFilledRows() {
        const newField = this.field.filter(row => row.some(pixel => pixel === 0));

        while (newField.length !== this.rowsInField) {
            newField.unshift(Array.from({length:this.columnsInField}, () => 0));
            this.score+=10;
            this.scoreElem.textContent = `Ваш счет: ${this.score}`;
            this.setRecord();
            if (this.score % 30 === 0) {
                this.currentLevel++;
                this.currentLevel > 10 ? this.currentLevel = 10 : null
                this.levelUp();
            }
        }

        this.field = newField;
        this.reRender();
    }

    checkRightOffset() {
        const arrayOfFullCells = this.currentShape.findFilledCellsOnRight();
        
        const verificationArray = arrayOfFullCells.reduce((acc, pixel) => {
            const nextPositionX = pixel.pixelPosition.x;
            const nextPositionY = pixel.pixelPosition.y + 1;

            if (nextPositionY < 0) {
                acc.push(false);
            } else {
                if (this.field[nextPositionX] === undefined) {
                    acc.push(true)
                } else {
                    const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;
                    acc.push(isCellAvailable); 
                }                
            }

            return acc;
        }, [])

        return verificationArray.every(el => el === true);
    }

    canItRotate(newShapeRotate) {
        return newShapeRotate.flat().every(pixel => {
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

        let newSpeed = (1000 - this.currentLevel * 100) + 100;

        newSpeed = newSpeed >= 100 ? newSpeed : 100;

        this.intervalId = setInterval(() => {
            this.onStepDown();
        }, newSpeed)
    }

    levelUp() {
        clearInterval(this.intervalId);       

        this.setInterval();
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
            }           
        })
    }
}

export default Tetris;