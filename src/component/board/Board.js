import React from 'react';
import PropTypes from 'prop-types';
import Square from '../square';

const Board = ({ squares, onClick, winningBoxes }) => {
  const createSquare = squareIndex => (
    <Square
      value={squares[squareIndex]}
      onClick={() => onClick(squareIndex)}
      style={winningBoxes.includes(squareIndex) ? { backgroundColor: 'lightgreen' } : {}}
    />
  );
  return (
    <div className="gameBoard">
      {createSquare(0)}
      {createSquare(1)}
      {createSquare(2)}
      {createSquare(3)}
      {createSquare(4)}
      {createSquare(5)}
      {createSquare(6)}
      {createSquare(7)}
      {createSquare(8)}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  winningBoxes: PropTypes.array.isRequired,
};

export default Board;
