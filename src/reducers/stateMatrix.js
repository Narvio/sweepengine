import { CellState, CellStateTransitions } from "../constants";
import { getSiblingIndices, copyObject } from "../utils";

const getSiblingFlagsCount = (stateMatrix, row, col) => {
  return getSiblingIndices(stateMatrix, row, col).filter(
    ([rIndex, cIndex]) => stateMatrix[rIndex][cIndex] === CellState.Flagged
  ).length;
};

const reveal = (stateMatrix, valueMatrix, row, col) => {
  const state = stateMatrix[row][col];
  const value = valueMatrix[row][col];

  if (state === CellState.Flagged) {
    // Ignore primary action on Flagged cells
    return;
  }

  // Reveal cell
  stateMatrix[row][col] = CellState.Revealed;

  if (
    value === 0 || // No bombs around - reveal all siblings (recursively)
    (state === CellState.Revealed &&
      getSiblingFlagsCount(stateMatrix, row, col) === value) // All bombs around flagged - reveal all siblings (recursively)
  ) {
    getSiblingIndices(stateMatrix, row, col)
      .filter(
        ([rIndex, cIndex]) => stateMatrix[rIndex][cIndex] !== CellState.Revealed
      )
      .forEach(([rIndex, cIndex]) =>
        reveal(stateMatrix, valueMatrix, rIndex, cIndex)
      );
  }
};

export const countFlags = (stateMatrix) => {
  return stateMatrix.reduce((count, row) => {
    return count + row.filter((cell) => cell === CellState.Flagged).length;
  }, 0);
};

const reduce = (state, activeCell, actionType) => {
  const stateMatrix = copyObject(state.stateMatrix);
  const newState = CellStateTransitions[actionType][activeCell.state];

  if (newState === CellState.Revealed) {
    reveal(stateMatrix, state.valueMatrix, activeCell.row, activeCell.col);
  }
  stateMatrix[activeCell.row][activeCell.col] = newState;

  return stateMatrix;
};

export default reduce;
