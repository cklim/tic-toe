import { WIN_NUMBER } from '../config/constants.js';

/**
 * @param {Array} currentMoves is an array of the current player moves coordinates.
 * @returns An array of winning cobination or false.
 */

export default (currentMoves) => {
  if (currentMoves.length < WIN_NUMBER) {
    return false;
  }

  const lastMove = currentMoves.slice(-1)[0];
  const filterHorizontalCells = (cell) => cell.x === lastMove.x;
  const filterVerticalCells = (cell) => cell.y === lastMove.y;
  const filterDiagonalCells = (cell) => cell.x === cell.y;
  const filterReversedDiagonalCells = (cell) => cell.x + cell.y === WIN_NUMBER + 1;

  const filterMoves = (condition) => {
    const filtered = currentMoves.filter(condition);
    return filtered.length === WIN_NUMBER && filtered;
  };

  return (
    filterMoves(filterHorizontalCells) ||
    filterMoves(filterVerticalCells) ||
    (lastMove.x === lastMove.y && filterMoves(filterDiagonalCells)) ||
    (lastMove.x + lastMove.y === WIN_NUMBER + 1 && filterMoves(filterReversedDiagonalCells))
  );
};
