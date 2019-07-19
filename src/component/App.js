import React from 'react';
import Game from './game';
import './App.scss';
import 'purecss/build/buttons.css';
import 'purecss/build/base.css';

const App = () => {
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Game />
    </div>
  );
}

export default App;
