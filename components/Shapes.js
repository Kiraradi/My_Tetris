import { createArrayBySize } from "../services/serveces.js";
const Shapes = class {
    currentType = this.#setRandomType();
    shape = null;
    currentRotate = 0;
 
    constructor (startPosition) {        
        // this.currentType = this.#setRandomType();
        this.startPosition = startPosition;
        // this.shape = null;
        // this.currentRotate = 0;
        this.createShape();        
    }

    #setRandomType() {     
        //['i', 'o', 't', 'z', 's', 'l', 'j']   
        const types = ['i', 'o', 't', 'z', 's', 'l', 'j'];
        return types[Math.floor(Math.random() * types.length)];
    }

    createShape() {
        switch (this.currentType) {
            case 'o':
                this.shape = this.createShapeTypeO();
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

    createShapeTypeO() {
        const bodyShapeForTypeO = createArrayBySize(2, 2);

        this.fillStartPosition(bodyShapeForTypeO, this.startPosition);

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
        for(let column = 0; column < shape.length; column++) {
            for(let row = 0; row < shape[column].length; row++) {
                shape[column][row].pixelPosition.x = startPosition.x - (shape.length - 1) + column;
                shape[column][row].pixelPosition.y = startPosition.y + row;
            }
        }
    }

    findFilledCellsAtBottom() {
        const arrayFilledCells = [];     

        for(let row = 0; row < this.shape[0].length; row++) {
            for(let column = this.shape.length - 1; column >=0 ; column--) {
                if(this.shape[column][row].pixelContent === 1) {
                    arrayFilledCells.push(this.shape[column][row]);
                    break;
                }
            }
        }        

        return arrayFilledCells
    }

    findFilledCellsOnLeft() {
        const arrayFilledCells = []; 

        for(let column = 0; column < this.shape.length; column++) {
            for(let row = 0; row < this.shape[0].length; row++) {
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

        for(let column = 0; column < this.shape.length; column++) {
            for(let row = this.shape[0].length - 1; row >= 0; row--) {
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

    shapeRotation() {
        const newRotate = this.currentRotate + 90 > 270 ? 0 : this.currentRotate + 90;
        const startPosition = this.shape[this.shape.length -1][0].pixelPosition;

        if (this.currentType === 'i') {           
            switch (newRotate) {
                case 0:
                case 180:
                    this.shape = this.createShapeTypeI_0(startPosition);
                    break;
                case 90:
                case 270:
                    this.shape = this.createShapeTypeI_90(startPosition);
                    break;
            }
            this.currentRotate = newRotate;
        }

        if (this.currentType === 'z') {            
            switch (newRotate) {
                case 0:
                case 180:
                    this.shape = this.createShapeTypeZ_0(startPosition);
                    break;
                case 90:
                case 270:
                    this.shape = this.createShapeTypeZ_90(startPosition);
                    break;
            }
            this.currentRotate = newRotate;
        }

        if (this.currentType === 's') {            
            switch (newRotate) {
                case 0:
                case 180:
                    this.shape = this.createShapeTypeS_0(startPosition);
                    break;
                case 90:
                case 270:
                    this.shape = this.createShapeTypeS_90(startPosition);
                    break;
            }
            this.currentRotate = newRotate;
        }

        if (this.currentType === 't') {            
            switch (newRotate) {
                case 0:
                    this.shape = this.createShapeTypeT_0(startPosition);
                    break;
                case 90:
                    this.shape = this.createShapeTypeT_90(startPosition);
                    break;
                case 180:
                    this.shape = this.createShapeTypeT_180(startPosition);
                    break;
                case 270:
                    this.shape = this.createShapeTypeT_270(startPosition);
                    break;
            }
            this.currentRotate = newRotate;
        }

        if (this.currentType === 'l') {            
            switch (newRotate) {
                case 0:
                    this.shape = this.createShapeTypeL_0(startPosition);
                    break;
                case 90:
                    this.shape = this.createShapeTypeL_90(startPosition);
                    break;
                case 180:
                    this.shape = this.createShapeTypeL_180(startPosition);
                    break;
                case 270:
                    this.shape = this.createShapeTypeL_270(startPosition);
                    break;
            }
            this.currentRotate = newRotate;
        }

        if (this.currentType === 'j') {            
            switch (newRotate) {
                case 0:
                    this.shape = this.createShapeTypeJ_0(startPosition);
                    break;
                case 90:
                    this.shape = this.createShapeTypeJ_90(startPosition);
                    break;
                case 180:
                    this.shape = this.createShapeTypeJ_180(startPosition);
                    break;
                case 270:
                    this.shape = this.createShapeTypeJ_270(startPosition);
                    break;
            }
            this.currentRotate = newRotate;
        }
        

    } 


}

export default Shapes;