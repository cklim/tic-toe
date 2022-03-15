import { INACTIVE, WIN, DRAW, O, X } from '../config/constants.js';

class Controls {
  #startBtn = $('#start');

  #resetBtn = $('#reset');

  #continueBtn = $('#continue');

  #connectBtn = $('#connect');

  gameOver = (message) => {
    this.#continueBtn.add(this.#resetBtn).fadeIn('fast');
    this.#continueBtn.text(message);
  };

  hideIngameMenu = (cb) => {
    this.#continueBtn.add(this.#resetBtn).fadeOut('fast', cb);
  };

  hideStartMenu = () => {
    this.#startBtn.add(this.#connectBtn).fadeOut('fast');
  };

  #showStartMenu = () => {
    this.#startBtn.add(this.#connectBtn).fadeIn('fast');
  };

  reset = () => {
    this.hideIngameMenu(this.#showStartMenu);
    this.#connectBtn.removeClass(`${WIN} ${INACTIVE}`).text('Play Online');
    this.#resetBtn.text('Exit');
  };

  startOnline = () => {
    this.#connectBtn.removeClass(DRAW).addClass(WIN);
  };

  setConnect = (player) => {
    this.#connectBtn
      .text(`You are joining as ${player === 'O' ? O : X}`)
      .addClass(`${DRAW} ${INACTIVE}`);
    this.#startBtn.fadeOut('fast');
  };
}

export default new Controls();
