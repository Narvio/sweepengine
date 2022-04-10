import { SiblingDirections } from "./constants";

export const createMatrix = (rows, cols, defaultValue) => {
  const itemFactory =
    typeof defaultValue === "function" ? defaultValue : () => defaultValue;

  return Array.from(Array(rows), (_, row) => {
    return Array.from(Array(cols), (_, col) => itemFactory(row, col));
  });
};

export const getSiblingIndices = (matrix, row, col) => {
  return SiblingDirections.map(([rowOffset, colOffset]) => [
    row + rowOffset,
    col + colOffset,
  ]).filter(
    ([rIndex, cIndex]) =>
      rIndex >= 0 &&
      cIndex >= 0 &&
      rIndex < matrix.length &&
      cIndex < matrix[0].length
  );
};

export const copyObject = (json) => JSON.parse(JSON.stringify(json));
