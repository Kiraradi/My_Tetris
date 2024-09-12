import { createElementByTag } from "../services/serveces.js";

const Tetris = class {
    constructor() {

    }

    drowUI(wrapperComponent) {
        const tetris = createElementByTag('div', 'tetris');

        wrapperComponent.append(tetris)
    }
}

export default Tetris;