import {
  INGAME,
  INACTIVE,
  CLICKED,
  INIT,
  X,
  O,
  CELL,
  WIN,
  DRAW,
  ANIM,
  NAME,
  LOSS,
} from '../config/constants.js';

class BoardUI {
  #gameCells = $(CELL);

  #hovered = null;

  start() {
    this.#gameCells
      .addClass(INGAME)
      .removeClass(`${CLICKED}  ${WIN} ${LOSS} ${DRAW} ${ANIM} ${INACTIVE}`)
      .text(INIT);
  }

  gameOver(winnerCells, isOnline) {
    const selectorArray = winnerCells.map((cell) => `[data-x=${cell.x}][data-y=${cell.y}]`);
    this.#gameCells.removeClass(INGAME).addClass(INACTIVE);
    $(selectorArray.join(',')).addClass(`${isOnline ? LOSS : WIN} ${ANIM}`);
  }

  getCellCoords = () => this.#hovered.data();

  click = () => {
    this.#hovered.addClass(`${CLICKED} ${INACTIVE}`).removeClass(INGAME);
  };

  hoverIn = (event, turn) => {
    const target = event?.target || `[data-x=${event.x}][data-y=${event.y}]`;
    this.#hovered = $(target);

    if (this.#hovered.hasClass(INGAME) && !this.#hovered.hasClass(CLICKED)) {
      turn === 'X' ? this.#hovered.text(X) : this.#hovered.text(O);
    }
  };

  hoverOut = () => {
    if (this.#hovered.hasClass(INGAME)) {
      this.#hovered.text(INIT);
      this.#hovered = null;
    }
  };

  activateCells = () => {
    this.#gameCells.removeClass(INACTIVE);
  };

  deactivateCells = () => {
    this.#gameCells.addClass(INACTIVE);
  };

  showDraw = () => {
    this.#gameCells.addClass(`${DRAW} ${INACTIVE}`);
  };

  continuePlaying() {
    this.start();
  }

  resetCells = () => {
    this.continuePlaying();
    this.#gameCells
      .addClass(`${INACTIVE}`)
      .removeClass(INGAME)
      .each((index, elm) => {
        $(elm).text(NAME[index]);
      });
  };
}

export default new BoardUI();
