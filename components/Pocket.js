import { createElementByTag } from "../services/serveces.js";

const Pocket = class {
    constructor(container) {
        this.container = container;
        this.shapeInPocket = null;
        this.drowUI();
        this.startPositionInPocket = {x: 3, y: 0};
    }

    drowUI() {
        const PocketElem = createElementByTag('div', 'pocket');

        const PockettitleElem = createElementByTag('h2', 'pocket_title', 'Карман');

        PocketElem.append(PockettitleElem);

        this.pocketFieldElem = createElementByTag('div', 'tetrisfield');

        PocketElem.append(this.pocketFieldElem);

        this.initField();
        this.drowField();

        this.container.append(PocketElem);

    }

    initField() {
        this.fieldForWindow = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    }

    drowField() {
        this.pocketFieldElem.innerHTML = '';

        this.fieldForWindow.forEach(column => {
            const rowElem = createElementByTag('div', 'row');
            column.forEach(cell => {
                const className = cell ? 'cell full_cell' : `cell`;
                const cellElem = createElementByTag('div', className);
                rowElem.append(cellElem);
            })

            this.pocketFieldElem.append(rowElem);
        })
    }

    installShapeInPocket(shape) {
        this.shapeInPocket = shape;
        this.shapeInPocket.reposition(this.startPositionInPocket);
        this.reRender();
    }

    reRender() {
        this.initField();
        this.shapeInPocket.shape.flat().forEach(pixel => {
            if (pixel.pixelPosition.x >= 0 && pixel.pixelPosition.y >= 0) {
                if(this.fieldForWindow[pixel.pixelPosition.x][pixel.pixelPosition.y] === 0 && pixel.pixelContent === 1) {
                    this.fieldForWindow[pixel.pixelPosition.x][pixel.pixelPosition.y] = pixel.pixelContent;
                }                
            }
        });      
        this.drowField();
    }
}

export default Pocket;