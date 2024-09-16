import { createElementByTag } from "../services/serveces.js";
import Shapes from "./Shapes.js";

const Tetris = class {
    constructor() {
        this.columnsInField = 20;
        this.rowsInField = 10;
        this.field = null;
        this.score = 0;
        this.currentShape = null;
        this.tetrisFieldElem = null
    }

    drowUI(wrapperComponent) {
        const tetrisElem = createElementByTag('div', 'tetris');        
        this.tetrisFieldElem = createElementByTag('div', 'tetrisfield');

        this.scoreElem =  createElementByTag('h2', 'score', `Ваш счет: ${this.score}`);
        tetrisElem.append(this.scoreElem);        

        tetrisElem.append(this.tetrisFieldElem);
        this.initField();

        wrapperComponent.append(tetrisElem);

        this.subscribeToEvents()
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

    initField() {
        this.field = Array.from({length: this.columnsInField},() => Array.from({length:this.rowsInField}, () => 0));
        this.startPositionForNewShapes = {x:0, y: Math.floor(this.field[0].length / 2) - 1};
        this.currentShape = new Shapes(this.startPositionForNewShapes);
        this.reRender()
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
        this.deleteLastPositionShape();
        this.currentShape.stepDown(this.field.length - 1);
        this.reRender();
        this.isShapeAtBottom();
    }

    onStepLeft() {
        if (this.checkLeftOffset()) {
            this.deleteLastPositionShape();
            this.currentShape.stepLeft();
            this.reRender();
        } 
    }

    onStepRight() {
        if (this.checkRightOffset()) {
            this.deleteLastPositionShape();
            this.currentShape.stepRight(this.field[0].length - 1);
            this.reRender();
        }
    }

    initNewShape() {
        this.currentShape = new Shapes(this.startPositionForNewShapes);
    }

    isShapeAtBottom() {
        const arrayOfFullCells = this.currentShape.findFilledCellsAtBottom();        

        const verificationArray = arrayOfFullCells.reduce((acc, pixel) => {
            const nextPositionX = pixel.pixelPosition.x + 1;
            const nextPositionY = pixel.pixelPosition.y;
            
            if (nextPositionX > this.columnsInField - 1) {
                acc.push(false);
            } else {
                const isCellAvailable = this.field[nextPositionX][nextPositionY] + pixel.pixelContent < 2;

                acc.push(isCellAvailable); 
            }

            return acc;
        }, []);

        if(verificationArray.some(el => el === false)) {
            this.initNewShape();
        }
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

        return verificationArray.every(el => el === true)
    }


    subscribeToEvents() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
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
                    break;
            }           
        })
    }
}

export default Tetris;