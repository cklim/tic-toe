import Board from '../UI/BoardUI.js';
import Control from '../UI/ControlUI.js';
import CheckWinner from '../utils/CheckWinner.js';
import { WIN_NUMBER } from '../config/constants.js';
import Score from '../UI/ScoreUI.js';

export default class Game {
  #clickedCells;

  #turn;

  constructor() {
    this.#turn = 'X';
    this.#clickedCells = { O: [], X: [], length: 0 };
  }

  start = () => {
    Board.start();
    Control.hideStartMenu();
    Score.show();
  };

  hoverIn = (event) => {
    Board.hoverIn(event, this.#turn);
  };

  move = (isOnlineMove) => {
    const coords = Board.getCellCoords();
    this.#pushNewMove(coords);
    Board.click();
    const winningCells = CheckWinner(this.#clickedCells[this.#turn]);

    if (Array.isArray(winningCells)) {
      Board.gameOver(winningCells, isOnlineMove);
      Control.gameOver(`${this.#turn} Won, Continue?`);
      Score.increment(this.#turn);
    } else if (this.#clickedCells.length === WIN_NUMBER ** 2) {
      Board.showDraw();
      Control.gameOver("It's a draw, Continue?");
    }
    this.switchTurns();
  };

  switchTurns = () => {
    this.#turn === 'X' ? (this.#turn = 'O') : (this.#turn = 'X');
  };

  reset = () => {
    this.#resetMoves();
    Board.resetCells();
    Control.reset();
    Score.hide();
  };

  continue = () => {
    this.#resetMoves();
    Board.start();
    Control.hideIngameMenu();
  };

  #pushNewMove = (data) => {
    const playerClicks = this.#clickedCells[this.#turn];
    playerClicks.push(data);
    this.#clickedCells.length += 1;
  };

  #resetMoves = () => {
    Object.keys(this.#clickedCells).forEach((key) => {
      if (Array.isArray(this.#clickedCells[key])) {
        this.#clickedCells[key] = [];
      } else this.#clickedCells[key] = 0;
    });
  };
}
