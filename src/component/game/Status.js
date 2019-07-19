import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ winner, history, playerOneIsNext, playerOneIcon, playerTwoIcon }) => {
  const currentPlayer = playerOneIsNext ? playerOneIcon : playerTwoIcon;
  if (winner) {
    return (
      <h3 className="status" style={{ color: 'darkgreen' }}>{winner} has won!</h3>
    );
  }
  if (history.length === 10) {
    return (
      <h3 className="status">Draw!</h3>
    );
  }
  return (
    <h3 className="status">{currentPlayer}'s turn</h3>
  ); 
}

Status.propTypes = {
  winner: PropTypes.object,
  history: PropTypes.array.isRequired,
  playerOneIsNext: PropTypes.bool.isRequired,
  playerOneIcon: PropTypes.object.isRequired,
  playerTwoIcon: PropTypes.object.isRequired,
}

Status.defaultProps = {
  winner: null,
};

export default Status;