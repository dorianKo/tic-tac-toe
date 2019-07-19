import React from 'react';
import { getWinner } from './Game';

describe('Game.js', () => {

  describe('getWinner', () => {
    test('returns array of winning indexes', () => {

      const winningSquares = ['X', 'X', 'X', 'O', 'X', 'O', null, null, null];
      const losingSquares = ['X', 'O', 'X', null, null, null, null, null, null];

      expect(getWinner(winningSquares)).toEqual([0, 1, 2]);
      expect(getWinner(losingSquares)).toEqual([]);

    });
  });
});
