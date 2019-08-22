import React, { Component } from 'react';
import Board from './board/board';
import { calculateWinner } from '../util/common';
import '../index.css';

class Game extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    stepNumber: 0,
  }
  handleSquareClick(squareNumber) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[squareNumber]) return;

    const tempSquares = [...squares];
    tempSquares[squareNumber] = this.isNextPlayer();
    this.setState({
      history: [
        ...this.state.history,
        { squares: tempSquares },
      ],
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  isNextPlayer(bool = true) {
    if (bool) return this.state.xIsNext ? 'X' : 'Y';
    return this.state.xIsNext ? 'Y' : 'X';
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner ? `Winner is ${winner}` : `Next player is ${this.isNextPlayer()}`;
    const historyList = history.map((step, move) => {
      const description = move ? `Go to move # ${move}` : `Go to game start`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(squareNumber) => this.handleSquareClick(squareNumber)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{historyList}</ol>
        </div>
      </div>
    );
  }
}

export default Game;