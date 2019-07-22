import React from 'react';
import { getWinningIndexes } from './Game';

describe('Game.js', () => {

  describe('getWinningIndexes', () => {
    test('returns array of winning indexes', () => {

      const winningSquares = ['X', 'X', 'X', 'O', 'X', 'O', null, null, null];
      const multipleWinners = ['X', 'X', 'X', 'O', 'X', 'O', 'X', 'O', 'O'];
      const losingSquares = ['X', 'O', 'X', null, null, null, null, null, null];

      expect(getWinningIndexes(winningSquares)).toEqual([0, 1, 2]);
      expect(getWinningIndexes(multipleWinners)).toEqual([0, 1, 2, 4, 6]);
      expect(getWinningIndexes(losingSquares)).toEqual([]);

    });
  });
});
