import React, { Component } from 'react';
import { GameButton } from './Button';

interface BoardProps {
  squares: string[],
  onClick: (i: number) => void
}

export class Board extends React.Component<BoardProps, {}> {
  static defaultProps = {
    squares: Array(9).fill(null)
  }

  renderSquare(i: number) {
    return <GameButton
      className={"square"}
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
