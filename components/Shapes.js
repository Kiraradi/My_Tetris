import { createArrayBySize } from "../services/serveces.js";
const Shapes = class {
    constructor (startPosition) {        
        this.currentType = this.#setRandomType();
        this.startPosition = startPosition;
        this.shape = null;
        this.createShape();        
    }

    #setRandomType() {
        const types = ['i', 'o', 't', 'z', 's', 'l', 'j'];
        return types[Math.floor(Math.random() * types.length)];
    }

    createShape() {
         if(this.currentType === 'o') {
            this.shape = this.createShapeTypeO();
         }

         if(this.currentType === 'i') {
            this.shape = this.createShapeTypeI();
         }

         if(this.currentType === 't') {
            this.shape = this.createShapeTypeT();
         }

         if(this.currentType === 'z') {
            this.shape = this.createShapeTypeZ();
         }

         if(this.currentType === 's') {
            this.shape = this.createShapeTypeS();
         }

         if(this.currentType === 'l') {
            this.shape = this.createShapeTypeL();
         }

         if(this.currentType === 'j') {
            this.shape = this.createShapeTypeJ();
         }
    }

    createShapeTypeO() {
        const bodyShapeForTypeO = createArrayBySize(2, 2);

        this.fillStartPosition(bodyShapeForTypeO);

        return bodyShapeForTypeO;
    }

    createShapeTypeI() {
        const bodyShapeForTypeI = createArrayBySize(4, 1);
        
        this.fillStartPosition(bodyShapeForTypeI); 

        return bodyShapeForTypeI
    }

    createShapeTypeT() {
        const bodyShapeForTypeT = createArrayBySize(2, 3);

        this.fillStartPosition(bodyShapeForTypeT);

        bodyShapeForTypeT[0][0].pixelContent = 0;
        bodyShapeForTypeT[0][2].pixelContent = 0;

        return bodyShapeForTypeT;
    }

    createShapeTypeZ() {
        const bodyShapeForTypeZ = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeZ);

        bodyShapeForTypeZ[0][0].pixelContent = 0;
        bodyShapeForTypeZ[2][1].pixelContent = 0;

        return bodyShapeForTypeZ;
    }

    createShapeTypeS() {
        const bodyShapeForTypeS = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeS);

        bodyShapeForTypeS[0][1].pixelContent = 0;
        bodyShapeForTypeS[2][0].pixelContent = 0;

        return bodyShapeForTypeS;
    }

    createShapeTypeL() {
        const bodyShapeForTypeL = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeL);

        bodyShapeForTypeL[0][1].pixelContent = 0;
        bodyShapeForTypeL[1][1].pixelContent = 0;

        return bodyShapeForTypeL;
    }

    createShapeTypeJ() {
        const bodyShapeForTypeJ = createArrayBySize(3, 2);

        this.fillStartPosition(bodyShapeForTypeJ);

        bodyShapeForTypeJ[0][0].pixelContent = 0;
        bodyShapeForTypeJ[1][0].pixelContent = 0;

        return bodyShapeForTypeJ;
    }

    fillStartPosition(shape) {
        for(let column = 0; column < shape.length; column++) {
            for(let row = 0; row < shape[column].length; row++) {
                shape[column][row].pixelPosition.x = this.startPosition.x - (shape.length ) + column;
                shape[column][row].pixelPosition.y = this.startPosition.y + row;
            }
        }
    }

    stepDown(lastPosition) {
        const bottomPixelPosition = this.shape[this.shape.length - 1][0].pixelPosition.x;

        this.shape.forEach(column => {
            if (bottomPixelPosition < lastPosition) {
                column.forEach(pixel => pixel.pixelPosition.x = ++pixel.pixelPosition.x)
            }
            
        })
    }

    stepLeft() {
        const leftPixelPosition = this.shape[0][0].pixelPosition.y;

        this.shape.forEach(column => {
            if (leftPixelPosition > 0) {
                column.forEach(pixel => pixel.pixelPosition.y = --pixel.pixelPosition.y)
            }            
        })
    }

    stepRight(lastPosition) {
        const rightPixelPosition = this.shape[this.shape.length - 1][this.shape[this.shape.length - 1].length - 1].pixelPosition.y;
        this.shape.forEach(column => {
            
            if (rightPixelPosition < lastPosition) {
                column.forEach(pixel => pixel.pixelPosition.y = ++pixel.pixelPosition.y)
            }            
        })

    }


}

export default Shapes;