import { createArrayBySize } from "../services/serveces.js";

const types = ['i', 'o', 't', 'z', 's', 'l', 'j'];

const Shapes = class {
    currentType = this.setRandomType();
    shape = null;
    currentRotate = 0;
    

    constructor(startPosition) {
        this.startPosition = startPosition;
        this.createShape();
        this.canItInstall = () => { };
    }

    setRandomType() {
        return types[Math.floor(Math.random() * types.length)];
    }

    createShape() {
        switch (this.currentType) {
            case 'o':
                this.shape = this.createShapeTypeO(this.startPosition);
                break;
            case 'i':
                this.shape = this.createShapeTypeI_0(this.startPosition);
                break;
            case 't':
                this.shape = this.createShapeTypeT_0(this.startPosition);
                break;
            case 'z':
                this.shape = this.createShapeTypeZ_0(this.startPosition);
                break;
            case 's':
                this.shape = this.createShapeTypeS_0(this.startPosition);
                break;
            case 'l':
                this.shape = this.createShapeTypeL_0(this.startPosition);
                break;
            case 'j':
                this.shape = this.createShapeTypeJ_0(this.startPosition);
                break;
        }
    }

    createShapeTypeO(startPosition) {
        const bodyShapeForTypeO = createArrayBySize(2, 2);

        this.fillStartPosition(bodyShapeForTypeO, startPosition);

        return bodyShapeForTypeO;
    }

    createShapeTypeI_0(startPosition) {
        const bodyShapeForTypeI = createArrayBySize(4, 1);

        this.fillStartPosition(bodyShapeForTypeI, startPosition);

        return bodyShapeForTypeI
    }

    createShapeTypeI_90(startPosition) {
        const bodyShapeForTypeI = createArrayBySize(1, 4);

        this.fillStartPosition(bodyShapeForTypeI, startPosition);

        return bodyShapeForTypeI
    }

    createShapeTypeT_0(startPosition) {
        const bodyShapeForTypeT = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeT, startPosition);

        bodyShapeForTypeT[0][0].pixelContent = 0;
        bodyShapeForTypeT[0][2].pixelContent = 0;

        return bodyShapeForTypeT;
    }

    createShapeTypeT_90(startPosition) {
        const bodyShapeForTypeT = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeT, startPosition);

        bodyShapeForTypeT[0][1].pixelContent = 0;
        bodyShapeForTypeT[2][1].pixelContent = 0;

        return bodyShapeForTypeT;
    }

    createShapeTypeT_180(startPosition) {
        const bodyShapeForTypeT = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeT, startPosition);

        bodyShapeForTypeT[1][0].pixelContent = 0;
        bodyShapeForTypeT[1][2].pixelContent = 0;

        return bodyShapeForTypeT;
    }

    createShapeTypeT_270(startPosition) {
        const bodyShapeForTypeT = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeT, startPosition);

        bodyShapeForTypeT[0][0].pixelContent = 0;
        bodyShapeForTypeT[2][0].pixelContent = 0;

        return bodyShapeForTypeT;
    }

    createShapeTypeZ_0(startPosition) {
        const bodyShapeForTypeZ = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeZ, startPosition);

        bodyShapeForTypeZ[0][0].pixelContent = 0;
        bodyShapeForTypeZ[2][1].pixelContent = 0;

        return bodyShapeForTypeZ;
    }

    createShapeTypeZ_90(startPosition) {
        const bodyShapeForTypeZ = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeZ, startPosition);

        bodyShapeForTypeZ[0][2].pixelContent = 0;
        bodyShapeForTypeZ[1][0].pixelContent = 0;

        return bodyShapeForTypeZ;
    }

    createShapeTypeS_0(startPosition) {
        const bodyShapeForTypeS = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeS, startPosition);

        bodyShapeForTypeS[0][1].pixelContent = 0;
        bodyShapeForTypeS[2][0].pixelContent = 0;

        return bodyShapeForTypeS;
    }

    createShapeTypeS_90(startPosition) {
        const bodyShapeForTypeS = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeS, startPosition);

        bodyShapeForTypeS[0][0].pixelContent = 0;
        bodyShapeForTypeS[1][2].pixelContent = 0;

        return bodyShapeForTypeS;
    }


    createShapeTypeL_0(startPosition) {
        const bodyShapeForTypeL = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeL, startPosition);

        bodyShapeForTypeL[0][1].pixelContent = 0;
        bodyShapeForTypeL[1][1].pixelContent = 0;

        return bodyShapeForTypeL;
    }

    createShapeTypeL_90(startPosition) {
        const bodyShapeForTypeL = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeL, startPosition);

        bodyShapeForTypeL[1][1].pixelContent = 0;
        bodyShapeForTypeL[1][2].pixelContent = 0;

        return bodyShapeForTypeL;
    }

    createShapeTypeL_180(startPosition) {
        const bodyShapeForTypeL = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeL, startPosition);

        bodyShapeForTypeL[1][0].pixelContent = 0;
        bodyShapeForTypeL[2][0].pixelContent = 0;

        return bodyShapeForTypeL;
    }

    createShapeTypeL_270(startPosition) {
        const bodyShapeForTypeL = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeL, startPosition);

        bodyShapeForTypeL[0][0].pixelContent = 0;
        bodyShapeForTypeL[0][1].pixelContent = 0;

        return bodyShapeForTypeL;
    }

    createShapeTypeJ_0(startPosition) {
        const bodyShapeForTypeJ = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeJ, startPosition);

        bodyShapeForTypeJ[0][0].pixelContent = 0;
        bodyShapeForTypeJ[1][0].pixelContent = 0;

        return bodyShapeForTypeJ;
    }

    createShapeTypeJ_90(startPosition) {
        const bodyShapeForTypeJ = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeJ, startPosition);

        bodyShapeForTypeJ[0][1].pixelContent = 0;
        bodyShapeForTypeJ[0][2].pixelContent = 0;

        return bodyShapeForTypeJ;
    }

    createShapeTypeJ_180(startPosition) {
        const bodyShapeForTypeJ = createArrayBySize(3, 2);



        this.fillStartPosition(bodyShapeForTypeJ, startPosition);

        bodyShapeForTypeJ[1][1].pixelContent = 0;
        bodyShapeForTypeJ[2][1].pixelContent = 0;

        return bodyShapeForTypeJ;
    }

    createShapeTypeJ_270(startPosition) {
        const bodyShapeForTypeJ = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeJ, startPosition);

        bodyShapeForTypeJ[1][0].pixelContent = 0;
        bodyShapeForTypeJ[1][1].pixelContent = 0;

        return bodyShapeForTypeJ;
    }

    fillStartPosition(shape, startPosition) {
        for (let column = 0; column < shape.length; column++) {
            for (let row = 0; row < shape[column].length; row++) {
                shape[column][row].pixelPosition.x = startPosition.x - (shape.length - 1) + column;
                shape[column][row].pixelPosition.y = startPosition.y + row;
            }
        }
    }

    findFilledCellsAtBottom() {
        const arrayFilledCells = [];

        for (let row = 0; row < this.shape[0].length; row++) {
            for (let column = this.shape.length - 1; column >= 0; column--) {
                if (this.shape[column][row].pixelContent === 1) {
                    arrayFilledCells.push(this.shape[column][row]);
                    break;
                }
            }
        }

        return arrayFilledCells;
    }

    findFilledCellsOnLeft() {
        const arrayFilledCells = [];

        for (let column = 0; column < this.shape.length; column++) {
            for (let row = 0; row < this.shape[0].length; row++) {
                if (this.shape[column][row].pixelContent === 1) {
                    arrayFilledCells.push(this.shape[column][row]);
                    break;
                }
            }
        }

        return arrayFilledCells;
    }

    findFilledCellsOnRight() {
        const arrayFilledCells = [];

        for (let column = 0; column < this.shape.length; column++) {
            for (let row = this.shape[0].length - 1; row >= 0; row--) {
                if (this.shape[column][row].pixelContent === 1) {
                    arrayFilledCells.push(this.shape[column][row]);
                    break;
                }
            }
        }

        return arrayFilledCells;
    }

    stepDown(lastPosition) {
        const bottomPixelPosition = this.shape[this.shape.length - 1][0].pixelPosition.x;

        this.shape.forEach(column => {
            if (bottomPixelPosition < lastPosition) {
                column.forEach(pixel => pixel.pixelPosition.x = ++pixel.pixelPosition.x);
            }
        })
    }

    stepLeft() {
        const leftPixelPosition = this.shape[0][0].pixelPosition.y;

        this.shape.forEach(column => {
            if (leftPixelPosition > 0) {
                column.forEach(pixel => pixel.pixelPosition.y = --pixel.pixelPosition.y);
            }
        })
    }

    stepRight(lastPosition) {
        const rightPixelPosition = this.shape[this.shape.length - 1][this.shape[this.shape.length - 1].length - 1].pixelPosition.y;
        this.shape.forEach(column => {

            if (rightPixelPosition < lastPosition) {
                column.forEach(pixel => pixel.pixelPosition.y = ++pixel.pixelPosition.y);
            }
        })

    }

    getNewRotateCorner() {
        return this.currentRotate + 90 > 270 ? 0 : this.currentRotate + 90;
    }

    getStartPositionCurrentShape() {
        return this.shape[this.shape.length - 1][0].pixelPosition;
    }

    reposition(newStartPosition) {
        this.shape = this.getNewRotation(newStartPosition, this.currentRotate)
    }

    getNewRotation(startPosition, newRotate) {
        let newShapeRotate;
        switch (this.currentType) {
            case 'i':
                if (newRotate === 90 || newRotate === 270) {
                    newShapeRotate = this.createShapeTypeI_90(startPosition);
                }
                else {
                    newShapeRotate = this.createShapeTypeI_0(startPosition);
                }
                break;
            case 'z':
                if (newRotate === 90 || newRotate === 270) {
                    newShapeRotate = this.createShapeTypeZ_90(startPosition);
                }
                else {
                    newShapeRotate = this.createShapeTypeZ_0(startPosition);
                }
                break;
            case 's':
                if (newRotate === 90 || newRotate === 270) {
                    newShapeRotate = this.createShapeTypeS_90(startPosition);
                }
                else {
                    newShapeRotate = this.createShapeTypeS_0(startPosition);
                }
                break;
            case 't':
                if (newRotate === 0) newShapeRotate = this.createShapeTypeT_0(startPosition);
                if (newRotate === 90) newShapeRotate = this.createShapeTypeT_90(startPosition);
                if (newRotate === 180) newShapeRotate = this.createShapeTypeT_180(startPosition);
                if (newRotate === 270) newShapeRotate = this.createShapeTypeT_270(startPosition);
                break;
            case 'l':
                if (newRotate === 0) newShapeRotate = this.createShapeTypeL_0(startPosition);
                if (newRotate === 90) newShapeRotate = this.createShapeTypeL_90(startPosition);
                if (newRotate === 180) newShapeRotate = this.createShapeTypeL_180(startPosition);
                if (newRotate === 270) newShapeRotate = this.createShapeTypeL_270(startPosition);
                break;
            case 'j':
                if (newRotate === 0) newShapeRotate = this.createShapeTypeJ_0(startPosition);
                if (newRotate === 90) newShapeRotate = this.createShapeTypeJ_90(startPosition);
                if (newRotate === 180) newShapeRotate = this.createShapeTypeJ_180(startPosition);
                if (newRotate === 270) newShapeRotate = this.createShapeTypeJ_270(startPosition);
                break;
            case 'o':
                newShapeRotate = this.createShapeTypeO(startPosition);
                break;
        }
        return newShapeRotate;
    }

    setNewRotation() {
        const newShapeRotate = this.getNewRotation(this.getStartPositionCurrentShape(), this.getNewRotateCorner());

        if (this.canItInstall(newShapeRotate)) {
            this.currentRotate = this.getNewRotateCorner();
            this.shape = newShapeRotate;
        }
    }
}

export default Shapes;