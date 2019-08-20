import React, { Component } from 'react';

interface ButtonProps {
  className: string,
  buttonLabel: string,
  onClick: () => void
}

export class GameButton extends React.Component<ButtonProps> {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.onClick}>
        {this.props.buttonLabel}
      </button>
    );
  }
}