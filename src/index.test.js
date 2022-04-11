import { generate, nextState, GameState, ActionType } from "./index";

describe("index.js", () => {
  let board;

  beforeEach(() => {
    board = generate({ rows: 10, cols: 15, bombs: 20 });
  });

  test("generator generates a new board", () => {
    expect(board.bombs).toEqual(20);
    expect(board.flags).toEqual(0);
    expect(board.gameState.code).toEqual(GameState.Initial);
  });

  test("nextState starts the game", () => {
    board = nextState(board, board.cells[0][0], ActionType.Primary);

    expect(board.gameState.code).toEqual(GameState.InProgress);
  });
});
