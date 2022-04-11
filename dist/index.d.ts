type ValueMatrix = any[][];
type StateMatrix = any[][];
type Cell = any;

interface State {
	bombs: number,
	flags: number,
	stateMatrix: StateMatrix,
	valueMatrix: ValueMatrix,
	cells: Cell[][],
	gameState: {
		code: GameState,
		details?: any
	}
}

interface Config {
	rows: number,
	cols: number,
	bombs: number
};

export declare enum ActionType {
	Primary = "Primary",
	Secondary = "Secondary",
};

export declare enum GameState {
	Initial = "Initial",
	InProgress = "InProgress",
	GameOver = "GameOver",
	Completed = "Completed",
};

/**
 * Builds the Cells abstraction from given state and value matrices
 * @param stateMatrix state matrix
 * @param valueMatrix value matrix
 * @returns Cells abstraction
 */
export declare function buildCells(stateMatrix: StateMatrix, valueMatrix: ValueMatrix): Cell[][];

/**
 * Generates a new game state
 * @param config new game configuration
 * @returns Initial state
 */
export declare function generate(config: Config): State;

/**
 * Computes the next game state
 * @param state current game state
 * @param activeCell active cell
 * @param actionType action type
 */
export declare function nextState(state: State, activeCell: any, actionType: ActionType): State;