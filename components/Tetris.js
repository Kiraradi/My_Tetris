import { createElementByTag } from "../services/serveces.js";

const Tetris = class {
    constructor() {
        this.field = this.initField();
        this.score = 0;
    }

    drowUI(wrapperComponent) {
        const tetrisElem = createElementByTag('div', 'tetris');        
        const tetrisfieldElem = createElementByTag('div', 'tetrisfield');

        this.scoreElem =  createElementByTag('h2', 'score', `Ваш счет: ${this.score}`);
        tetrisElem.append(this.scoreElem);
        

        tetrisElem.append(tetrisfieldElem);
        this.drowField(tetrisfieldElem);

        wrapperComponent.append(tetrisElem);
    }

    drowField(container) {
        this.field.map(column => {
            const rowElem = createElementByTag('div', 'row');
            column.forEach(cell => {
                const className = cell ? 'cell full_cell': `cell`
                const cellElem = createElementByTag('div', className);
                rowElem.append(cellElem);
            })
            container.append(rowElem);
            
        })
    } 

    initField() {
        const field = Array.from({length: 20},() => Array.from({length:10}, () => 0));

        return field 
    }
}

export default Tetris;