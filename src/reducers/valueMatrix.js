import { GameState, ActionType, BombValue } from "../constants";
import { getSiblingIndices, copyObject } from "../utils";

const generateBombs = (valueMatrix, bombs, ignoredCell) => {
  for (let i = 0; i < bombs; ++i) {
    let row;
    let col;

    do {
      row = Math.floor(Math.random() * valueMatrix.length);
      col = Math.floor(Math.random() * valueMatrix[0].length);
    } while (
      (row === ignoredCell.row && col === ignoredCell.col) ||
      valueMatrix[row][col] === BombValue
    );

    valueMatrix[row][col] = BombValue;
  }
};

const computeValues = (valueMatrix) => {
  for (let row = 0; row < valueMatrix.length; ++row) {
    for (let col = 0; col < valueMatrix[row].length; ++col) {
      if (valueMatrix[row][col] === BombValue) {
        continue;
      }

      const siblingBombs = getSiblingIndices(valueMatrix, row, col).filter(
        ([rIndex, cIndex]) => valueMatrix[rIndex][cIndex] === BombValue
      ).length;

      valueMatrix[row][col] = siblingBombs;
    }
  }
};

const reduce = (state, activeCell, actionType) => {
  const valueMatrix = copyObject(state.valueMatrix);
  if (
    state.gameState.code === GameState.Initial &&
    actionType === ActionType.Primary
  ) {
    generateBombs(valueMatrix, state.bombs, activeCell);
    computeValues(valueMatrix);
  }

  return valueMatrix;
};

export default reduce;
