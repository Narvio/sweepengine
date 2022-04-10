import { CellState, GameState } from "./constants";
import { createMatrix } from "./utils";

import valueMatrixReducer from "./reducers/valueMatrix";
import stateMatrixReducer, { countFlags } from "./reducers/stateMatrix";
import gameStateReducer from "./reducers/gameState";

const buildCells = (stateMatrix, valueMatrix) => {
  return createMatrix(stateMatrix.length, stateMatrix[0].length, (row, col) => {
    const state = stateMatrix[row][col];
    const value = valueMatrix[row][col];

    return {
      col,
      row,
      state,
      value,
      isFlagged: state === CellState.Flagged,
      isRevealed: state === CellState.Revealed,
      isBomb: value === -1,
      isZero: value === 0,
    };
  });
};

export const generate = ({ rows, cols, bombs }) => {
  const stateMatrix = createMatrix(rows, cols, CellState.Standard);
  const valueMatrix = createMatrix(rows, cols, 0);

  const cells = buildCells(stateMatrix, valueMatrix);

  return {
    bombs,
    flags: 0,
    stateMatrix,
    valueMatrix,
    cells,
    gameState: {
      code: GameState.Initial,
    },
  };
};

export const nextState = (state, activeCell, actionType) => {
  /*
    New state has to be computed sequentialy
  */
  const newState = { ...state };

  if (
    newState.gameState.code === GameState.GameOver ||
    newState.gameState.code === GameState.Completed
  ) {
    return newState;
  }

  /*
  /*
    valueMatrix is not initialized until the user makes the first click (to ensure he never starts with the mine cell).
    Therefore the state is modified to ensure proper functionality of the other reducers
  */
  newState.valueMatrix = valueMatrixReducer(newState, activeCell, actionType);
  /*
    stateMatrix needs actual valueMatrix state to take bomb positions into account
  */
  newState.stateMatrix = stateMatrixReducer(newState, activeCell, actionType);
  /*
    gameState requires current state to evaluate game progress (game over, win, etc..)
   */
  newState.gameState = gameStateReducer(newState, activeCell, actionType);
  /*
    cells and flags are just a helper constructs for the UI consumer
  */
  newState.cells = buildCells(newState.stateMatrix, newState.valueMatrix);
  newState.flags = countFlags(newState.stateMatrix);

  return newState;
};
