import { GameState, ActionType, CellState, BombValue } from "../constants";

const revealedBombIndex = (stateMatrix, valueMatrix) => {
  for (let rowIndex = 0; rowIndex < stateMatrix.length; ++rowIndex) {
    for (let colIndex = 0; colIndex < stateMatrix[0].length; ++colIndex) {
      if (
        stateMatrix[rowIndex][colIndex] === CellState.Revealed &&
        valueMatrix[rowIndex][colIndex] === BombValue
      ) {
        return [rowIndex, colIndex];
      }
    }
  }

  return null;
};

const isAllCleared = (stateMatrix, valueMatrix) => {
  let cleared = true;

  stateMatrix.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      cleared =
        cleared &&
        (stateMatrix[rowIndex][colIndex] === CellState.Revealed ||
          valueMatrix[rowIndex][colIndex] === BombValue);
    });
  });

  return cleared;
};

const reduce = (state, activeCell, actionType) => {
  const gameState = {
    code: GameState.InProgress,
    details: null,
  };

  if (
    state.gameState.code === GameState.Initial &&
    actionType === ActionType.Secondary
  ) {
    gameState.code = GameState.Initial;
  } else {
    const bombIndex = revealedBombIndex(state.stateMatrix, state.valueMatrix);
    if (bombIndex) {
      gameState.code = GameState.GameOver;
      gameState.details = bombIndex;
    } else if (isAllCleared(state.stateMatrix, state.valueMatrix)) {
      gameState.code = GameState.Completed;
    }
  }

  return gameState;
};

export default reduce;
