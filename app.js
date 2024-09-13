import Tetris from "./components/Tetris.js";

const tetrisWrapper = document.getElementById('tetris_wrapper');

const tetris = new Tetris();

tetris.drowUI(tetrisWrapper);
