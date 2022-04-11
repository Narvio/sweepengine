# sweepengine

Handy and easy to use game engine for Minesweeper UI clients. This package is framework independent so it's up to you which UI technology would like to use.

## How to

### Installation

```sh
npm install sweepengine
```

### Initialization

Just import the required functionality

```js
import { generate, nextState, ActionType, GameState } from 'sweepengine'
```

### Usage

Generate a new board state

```js
let state = generate({
  rows: 5,
  cols: 5,
  bombs: 5
});
```

Build a new state after some user interaction

```js
state = nextState(state, selectedCell, ActionType.Primary);
```

State contains following fields

* `bombs` total number of bombs
* `flags` number of flagged fields
* `cells` matrix with cells. Each cell consists of
  * `col` column index
  * `row` row index
  * `value` number of adjacent mines
  * `isFlagged` flag indicator
  * `isRevealed` revealed indicator
  * `isBomb` bomb indicator
  * `isZero` empty field indicator
* `gameState` object containing following properties
  * `code` state value from `GameSate` enum
  * `details` optional state details (eg. failure cell indices in case of game over)

### Play

Example game loop:

```js
let state = generate({ rows, cols, bombs});

while (
  state.gameState.code !== GameState.GameOver &&
  state.gameState.code !== GameState.Completed
) {
  renderUi(state); // your custom function

  let { activeCell, actionType } = waitForUserInteraction(state); // your custom function

  state = nextState(state, activeCell, actionType);
}
```

## License

The code is free and open-source under the MIT license, so feel free to use it in any way you like.

## Author

* [Narvio](https://narvio.github.io/)
* [Narvio Github](https://github.com/Narvio/)
* [Michal Kozubik](https://github.com/kozubikmichal)
