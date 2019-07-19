import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ value, onClick, style }) => (
  <button className="square" onClick={onClick} style={style}>
    {value}
  </button>
);

Square.propTypes = {
  value: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};

Square.defaultProps = {
  value: null,
}

export default Square;
