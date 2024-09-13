const Shapes = class {
    constructor (startPosition) {        
        this.currentType = this.#setRandomType();
        this.startPosition = startPosition;
        this.shape = null;
        this.createShape();        
    }

    #setRandomType() {
        //['i', 'z', 'o', 'l', 's', 't']
        const types = ['o']
        return types[Math.floor(Math.random() * types.length)];
    }

    createShape() {
         if(this.currentType === 'o') {
            this.shape = this.createShapeTypeO();
         }
    }

    createShapeTypeO() {
        const bodyShapeForTypeO = Array.from({length: 2},() => Array.from({length:2}, () => {
            return {
                pixelPosition: {x:0, y:0},
                pixelContent: 1 
            }
        }));
        
        for(let column = 0; column < bodyShapeForTypeO.length; column++) {
            for(let row = 0; row < bodyShapeForTypeO[column].length; row++) {
                bodyShapeForTypeO[column][row].pixelPosition.x = this.startPosition.x - (bodyShapeForTypeO.length ) + column;
                bodyShapeForTypeO[column][row].pixelPosition.y = this.startPosition.y + row;
            }
        }

        return bodyShapeForTypeO

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