export const CellState = {
  Standard: "-",
  Flagged: "?",
  Revealed: "X",
};

export const ActionType = {
  Primary: "Primary",
  Secondary: "Secondary",
};

export const CellStateTransitions = {
  [ActionType.Primary]: {
    [CellState.Standard]: CellState.Revealed,
    [CellState.Flagged]: CellState.Flagged,
    [CellState.Revealed]: CellState.Revealed,
  },
  [ActionType.Secondary]: {
    [CellState.Standard]: CellState.Flagged,
    [CellState.Flagged]: CellState.Standard,
    [CellState.Revealed]: CellState.Revealed,
  },
};

export const GameState = {
  Initial: "Initial",
  InProgress: "InProgress",
  GameOver: "GameOver",
  Completed: "Completed",
};

export const SiblingDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const BombValue = -1;
