import Tetris from "./components/Tetris.js";

const tetrisWrapper = document.querySelector('.tetris_wrapper');

const tetris = new Tetris();

tetris.drowUI(tetrisWrapper);
