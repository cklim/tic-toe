/* eslint-disable import/extensions */
import { WIN, DRAW, LOSS, ANIM } from '../config/constants.js';

class ScoreUI {
  #oScore = $('#O');

  #xScore = $('#X');

  #scoreContainer = $('#scores > div');

  increment = (turn) => {
    const winner = $(`#${turn}`);
    winner.text((_, score) => parseInt(score, 10) + 1);
    this.#setGameOverEffects();
    this.#animateWinner(winner);
  };

  show = () => {
    this.#scoreContainer.fadeIn('fast').css('display', 'flex');
  };

  hide = () => {
    this.#oScore.add(this.#xScore).text('0').addClass(DRAW).removeClass(`${WIN} ${LOSS}`);
    this.#scoreContainer.fadeOut('fast');
  };

  #setGameOverEffects = () => {
    const diff = parseInt(this.#xScore.text(), 10) - parseInt(this.#oScore.text(), 10);
    if (diff === 0) {
      this.#xScore.add(this.#oScore).addClass(DRAW).removeClass(`${WIN} ${LOSS}`);
    } else if (diff < 0) {
      this.#setWinState(this.#oScore, this.#xScore);
    } else {
      this.#setWinState(this.#xScore, this.#oScore);
    }
  };

  #setWinState = (winner, loser) => {
    winner.addClass(WIN).removeClass(`${LOSS} ${DRAW}`);
    loser.addClass(LOSS).removeClass(`${WIN} ${DRAW}`);
  };

  #animateWinner = (winner) => {
    winner.addClass(`${ANIM}`);
    setTimeout(this.#removeAnims, 1000);
  };

  #removeAnims = () => {
    this.#xScore.add(this.#oScore).removeClass(ANIM);
  };
}

export default new ScoreUI();
