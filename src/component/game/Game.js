import React, { Component } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import flatten from 'lodash/fp/flatten';
import Board from '../board';
import Status from './Status';
import xIcon from './icons/xIcon.svg';
import circle from './icons/circle.svg';
import square from './icons/square.svg';
import sean from './icons/sean.png';

const PLAYER1_DEFAULT_ICON = <img src={xIcon} className="pure-img" alt="X" />;
const PLAYER2_DEFAULT_ICON = <img src={circle} className="pure-img" alt="O" />;
const PLAYER1_TOURNAMENT_ICON = <img src={square} className="pure-img" alt="X" />;
const PLAYER2_TOURNAMENT_ICON = <img src={sean} className="pure-img" alt="O" />;
const winningSquares = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/**
 * gets all winning indexes and reduces them into single array without duplicates
 * @param {Array} winningSquares
 * @return {Array} array of winning indexes
 */
export const getWinningIndexes = squares => {
  return [...new Set(flatten(winningSquares.filter(([a,b,c]) => {
    return (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c]));
  })))];
};

// use this if we only want to show the first three winning indexes
// const getWinningIndexesFind = squares => {
//   const winningIndexes = winningSquares.find(([a,b,c]) => {
//     return (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c]));
//   });
//   return winningIndexes ? winningIndexes : [];
// };

class Game extends Component {
  state = {
    playerOneIcon: PLAYER1_DEFAULT_ICON,
    playerTwoIcon: PLAYER2_DEFAULT_ICON,
    playerOneIsNext: true,
    moveNumber: 0,
    winningBoxes: [],
    winner: null,
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    undid: false,
    tournamentMode: false,
  };

  handleClick = squareIndex => {
    const {
      playerOneIcon, playerTwoIcon, playerOneIsNext, moveNumber, history, winner
    } = this.state;
    const previousMoves = history.slice(0, moveNumber + 1);
    const current = previousMoves[previousMoves.length - 1];
    const resolvedSquares = current.squares.slice();
    if (resolvedSquares[squareIndex] || winner) {
      return;
    }
    resolvedSquares[squareIndex] = playerOneIsNext ? playerOneIcon : playerTwoIcon;
    this.setState({
      playerOneIsNext: !playerOneIsNext,
      moveNumber: previousMoves.length,
      history: previousMoves.concat([{ squares: resolvedSquares }]),
      undid: false,
    });
    if (!isEmpty(getWinningIndexes(resolvedSquares))) {
      this.setState({
        winningBoxes: getWinningIndexes(resolvedSquares),
        winner: resolvedSquares[getWinningIndexes(resolvedSquares)[0]],
      });
    }
  }

  handleUndo = move => {
    const { playerOneIsNext, winner, undid, history } = this.state;
    if  (winner || history.length === 10) {
      this.setState({
        moveNumber: 0,
        playerOneIsNext: true,
        undid: false,
        winningBoxes: [],
        winner: null,
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
      });
      return;
    }
    if (move && !undid) {
      this.setState({
        moveNumber: move - 1,
        playerOneIsNext: !playerOneIsNext,
        undid: !undid,
      });
    }
  }

  handleSwapIcons = () => {
    const {
      tournamentMode,
      history,
      moveNumber,
      playerOneIcon,
      playerTwoIcon,
      winningBoxes
    } = this.state;
    const p1Icon = tournamentMode ? PLAYER1_DEFAULT_ICON : PLAYER1_TOURNAMENT_ICON;
    const p2Icon = tournamentMode ? PLAYER2_DEFAULT_ICON : PLAYER2_TOURNAMENT_ICON;
    const swapSquares = x => {
      if (x === playerOneIcon) {
        return x = p1Icon;
      }
      if (x === playerTwoIcon) {
        return x = p2Icon;
      }
    };
    this.setState({
      tournamentMode: !tournamentMode, 
      playerOneIcon: p1Icon,
      playerTwoIcon: p2Icon,
    });
    if (moveNumber) {
      // only change history if moves have been made
      const currentMove = history[moveNumber].squares.slice();
      const previousMoves = history.slice(0, moveNumber - 1);
      const lastMove = history[moveNumber - 1].squares.slice();
      const currentSwappedIcons = currentMove.map(swapSquares);
      const lastSwappedIcons = lastMove.map(swapSquares);
      this.setState({
        history: previousMoves.concat([{ squares: lastSwappedIcons }, { squares: currentSwappedIcons }]),
        winner: currentSwappedIcons[winningBoxes[0]],
      });
    }
  }

  render() {
    const {
      playerOneIsNext,
      playerOneIcon,
      playerTwoIcon,
      undid,
      winner,
      winningBoxes,
      moveNumber,
      history,
      tournamentMode,
    } = this.state;

    const current = history[moveNumber];

    return (
      <>
        <Status
          winner={winner}
          history={history}
          playerOneIsNext={playerOneIsNext}
          playerOneIcon={playerOneIcon}
          playerTwoIcon={playerTwoIcon}
        />
        <div className="buttons">
          <button
            className="pure-button"
            onClick={() => this.handleUndo(moveNumber)}
            disabled={undid || history.length === 1}
            style= {winner ? { backgroundColor: 'lightgreen' } : {}}
          >
              {winner || history.length === 10 ? 'Reset' : 'Undo'}
          </button>
          <button
            className="pure-button"
            onClick={this.handleSwapIcons}
          >
            {tournamentMode ? 'Classic Mode' : 'Tournament Mode'}
          </button>
        </div>
        <Board
          squares={current.squares}
          onClick={i => this.handleClick(i)}
          winningBoxes={winningBoxes}
        />
      </>
    );
  }
}

export default Game;
