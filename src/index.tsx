import React, { Component } from 'react';
import { render } from 'react-dom';
import { Game } from './components/Game';
import './style.css';

// Continue with tutorial here:
// https://reactjs.org/tutorial/tutorial.html

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
