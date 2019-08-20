import React, { Component } from 'react';

interface ButtonProps {
  buttonLabel: string,
  onClick: () => void
}

class Square extends React.Component<ButtonProps> {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.buttonLabel}
      </button>
    );
  }
}
class Clear extends React.Component<ButtonProps> {
  render() {
    return (
      <button className="clear-button" onClick={this.props.onClick}>
        {this.props.buttonLabel}
      </button>
    );
  }
}


interface BoardProps {
  squares: string[],
  onClick: (i: number) => void
}

class Board extends React.Component<BoardProps, {}> {
  static defaultProps = {
    squares: Array(9).fill(null)
  }

  renderSquare(i: number) {
    return <Square
      buttonLabel={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


interface GameState {
    history: { squares: string[] }[],
    stepNumber: number,
    xIsNext: boolean,
    uniqueId: number
}

export class Game extends React.Component<{}, GameState> {

  readonly baseState: object;
  constructor(props: GameState) {
    super(props);
    const initsqrs = [] as string[];
    for (let i = 0; i < 9; i++) {
        initsqrs[i] = "";
    }
    this.state = {
        history: [{ squares: initsqrs }],
        stepNumber: 0,
        xIsNext: true,
        uniqueId: 0
    }
    this.baseState = this.state;
  }

  handleClick(i: number) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
          history: history.concat([{ squares: squares }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
      });
  }

  clearBoard() {
    this.setState(this.baseState);
  }

  jumpTo(step: number) {
    this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ? "Move #" + move : "Game Start";
        return (
            <li key={move}>
                <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
            </li>
        );
    });

    let status: string;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        if (current.squares.every((s) => s != "")) {
            status = "Draw game";
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
        }

    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
          />
          <Clear
            buttonLabel={"Start over"}
            onClick={() => this.clearBoard()}
          />            
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: string[]): string {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return "";
}