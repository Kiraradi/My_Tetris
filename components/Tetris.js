import { createElementByTag } from "../services/serveces.js";
import Shapes from "./Shapes.js";

const Tetris = class {
    constructor() {
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
        this.drowField();

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
        this.field = Array.from({length: 20},() => Array.from({length:10}, () => 0));
        this.startPositionForNewShapes = {x:0, y: Math.floor(this.field[0].length / 2) - 1};
        this.currentShape = new Shapes(this.startPositionForNewShapes);
        this.reRender()
    }

    reRender() {
        this.currentShape.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0) {
                this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] = pixel.pixelContent;
            }
        });      

        this.drowField();
    }

    deleteLastPositionShape() {
        this.currentShape.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0) {
                this.field[pixel.pixelPosition.x][pixel.pixelPosition.y] = 0;
            }
        });
    }


    onStepDown() {
        this.deleteLastPositionShape();
        this.currentShape.stepDown(this.field.length - 1);
        this.reRender();
    }

    onStepLeft() {
        this.deleteLastPositionShape();
        this.currentShape.stepLeft();
        this.reRender();
    }

    onStepRight() {
        this.deleteLastPositionShape();
        this.currentShape.stepRight(this.field[0].length - 1);
        this.reRender();
    }

    subscribeToEvents() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            if (event.code === 'ArrowDown') {
                this.onStepDown();
            }

            if (event.code === 'ArrowLeft') {
                this.onStepLeft();
            }

            if (event.code === 'ArrowRight') {
                this.onStepRight();
            }            
        })
    }
}

export default Tetris;