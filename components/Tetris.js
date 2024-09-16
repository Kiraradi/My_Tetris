import { createElementByTag } from "../services/serveces.js";
import Shapes from "./Shapes.js";

const Tetris = class {
    constructor() {
        this.rowsInField = 20;
        this.columnsInField = 10;
        this.field = null;
        this.score = 0;
        this.currentShape = null;
        this.tetrisFieldElem = null;
        this.speed = 1000;
    }

    drowUI(wrapperComponent) {
        const tetrisElem = createElementByTag('div', 'tetris');        
        this.tetrisFieldElem = createElementByTag('div', 'tetrisfield');

        this.scoreElem =  createElementByTag('h2', 'score', `Ваш счет: ${this.score}`);
        tetrisElem.append(this.scoreElem);        

        tetrisElem.append(this.tetrisFieldElem);
        this.initField();

        wrapperComponent.append(tetrisElem);

        this.subscribeToEvents();

        // this.idInterval = setInterval(() => {
        //     this.onStepDown();
        // }, this.speed)
    }

    drowField() {
        this.scoreElem.textContent = `Ваш счет: ${this.score}`
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
        this.field = Array.from({length: this.rowsInField},() => Array.from({length:this.columnsInField}, () => 0));
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
        this.canItRotate();
        this.deleteLastPositionShape();
        this.currentShape.shapeRotation();        
        this.reRender();
    }

    initNewShape() {
        if(this.field[this.startPositionForNewShapes.x][this.startPositionForNewShapes.y] === 1) {
            clearInterval(this.idInterval);
            alert(`Game over, your score ${this.score}`);
        } else {
            this.currentShape = new Shapes(this.startPositionForNewShapes);
        }
        
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
        const record = window.localStorage('record');
        return record ? Number(record) : 0
    }

    setRecord() {
        //ToDo
        this.getRecord() < this.score ? window.localStorage('record', this.score) : null
        
    }

    deleteFilledRows() {
        const newField = this.field.filter(row => row.some(pixel => pixel === 0));

        while (newField.length !== this.rowsInField) {
            newField.unshift(Array.from({length:this.columnsInField}, () => 0));
            this.score+=10;
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

        return verificationArray.every(el => el === true)
    }

    canItRotate() {
        if (this.currentShape.currentRotate === 0 || this.currentShape.currentRotate === 180) {
            console.log('0 180')
        }

        if (this.currentShape.currentRotate === 90 || this.currentShape.currentRotate === 270) {
            console.log('90 270')
        }
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
                    this.onShapeRotation();
                    break;
            }           
        })
    }
}

export default Tetris;