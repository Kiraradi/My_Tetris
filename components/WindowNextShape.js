import { createElementByTag } from "../services/serveces.js";

const WindowNextShape = class {
    constructor(container) {
        this.container = container;
        this.nextShape = null;
        this.drowUI();
    }

    drowUI() {
        const windowNextShapeElem = createElementByTag('div', 'window_next_shape');

        const titleElem = createElementByTag('h2', 'windowNextShape_title', 'Следующая фигура');
        
        windowNextShapeElem.append(titleElem);

        this.nextShapeFieldElem = createElementByTag('div', 'tetrisfield');

        windowNextShapeElem.append(this.nextShapeFieldElem);

        this.initField();
        this.drowField();

        this.container.append(windowNextShapeElem);

    }

    initField() {
        this.fieldForWindow = Array.from({length: 4},() => Array.from({length:4}, () => 0));
    }

    drowField() {
        this.nextShapeFieldElem.innerHTML = '';

        this.fieldForWindow.forEach(column => {
            const rowElem = createElementByTag('div', 'row');
            column.forEach(cell => {
                const className = cell ? 'cell full_cell': `cell`;
                const cellElem = createElementByTag('div', className);
                rowElem.append(cellElem);
            })

            this.nextShapeFieldElem.append(rowElem);
        })
    }

    installNextShape(nextShape) {
        this.nextShape = nextShape;
        this.reRender();
    }

    reRender() {
        this.initField();
        this.nextShape.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0) {
                if(this.fieldForWindow[pixel.pixelPosition.x][pixel.pixelPosition.y] === 0 && pixel.pixelContent === 1) {
                    this.fieldForWindow[pixel.pixelPosition.x][pixel.pixelPosition.y] = pixel.pixelContent;
                }                
            }
        });      
        this.drowField();
    }
}

export default WindowNextShape;