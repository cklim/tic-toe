/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Game from './Game.js';
import Board from '../UI/BoardUI.js';
import COntrols from '../UI/ControlUI.js';

export default class OnlineGame extends Game {
  constructor() {
    super();
    this.socket = io();
    this.socket.emit('new connection');

    this.socket.on('joined', (player) => {
      COntrols.setConnect(player);
      if (player === 'O') this.switchTurns();
    });

    this.socket.on('matched', () => {
      this.start();
      COntrols.startOnline();
    });

    this.socket.on('mouseenter', (data) => {
      this.switchTurns();
      this.hoverIn(data);
    });

    this.socket.on('mouseleave', () => {
      this.switchTurns();
      Board.hoverOut();
    });

    this.socket.on('click', () => {
      Board.activateCells();
      this.move(true);
      this.switchTurns();
    });

    this.socket.on('continue', () => {
      this.continue();
      Board.deactivateCells();
    });

    this.socket.on('disconnected', () => {
      this.reset();
      Board.deactivateCells();
      this.socket.disconnect();
    });
  }

  onlineHoverIn = (event) => {
    const data = $(event.target).data();
    this.hoverIn(event);
    this.socket.emit('mouseenter', data);
  };

  onlineHoverOut = (event) => {
    Board.hoverOut(event);
    this.socket.emit('mouseleave');
  };

  onlineMove = () => {
    Board.deactivateCells();
    const data = Board.getCellCoords();
    this.move();
    this.socket.emit('click', data);
    this.switchTurns();
  };

  continueOnline = () => {
    this.continue();
    this.socket.emit('continue');
  };

  disconnect = () => {
    this.reset();
    this.socket.emit('exit');
  };
}
