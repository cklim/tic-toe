import Game from './Game.js';
import Board from '../UI/BoardUI.js';
import OnlineGame from './OnlineGame.js';
import { CELL } from '../config/constants.js';

$(document).ready(() => {
  const $boardCells = $(CELL);

  // Local game
  $('#start').click(() => {
    const game = new Game();

    game.start();

    $boardCells
      .off()
      .on('mouseenter', game.hoverIn)
      .on('touchstart', (e) => {
        game.hoverIn(e);
        game.move();
      })
      .on('mouseleave touchend', Board.hoverOut)
      .on('click', () => game.move());

    $('#continue').off().click(game.continue);
    $('#reset').off().click(game.reset);
  });

  // Online game
  $('#connect').click(() => {
    const onlineGame = new OnlineGame();

    $boardCells
      .off()
      .on('mouseenter', onlineGame.onlineHoverIn)
      .on('touchstart', (e) => {
        onlineGame.onlineHoverIn(e);
        onlineGame.onlineMove();
      })
      .on('mouseleave touchend', onlineGame.onlineHoverOut)
      .click(() => onlineGame.onlineMove());

    $('#continue').click(onlineGame.continueOnline);
    $('#reset').off().text('Disconnect').click(onlineGame.disconnect);
    $(document).on('unload', onlineGame.disconnect);
  });
});
