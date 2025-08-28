
import React from 'react';
import { Square } from './Square';
import { Piece, GameStatus } from '../../types';

interface BoardProps {
  board: { square: string; piece: Piece | null }[];
  selectedSquare: string | null;
  possibleMoves: string[];
  onSquareClick: (square: string) => void;
  gameStatus: GameStatus;
}

export const Board: React.FC<BoardProps> = ({ board, selectedSquare, possibleMoves, onSquareClick, gameStatus }) => {
  return (
    <div className="w-full aspect-square grid grid-cols-8 grid-rows-8 shadow-2xl rounded-lg overflow-hidden border-4 border-slate-800">
      {board.map(({ square, piece }, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const isLight = (row + col) % 2 !== 0;
        
        return (
          <Square
            key={square}
            isLight={isLight}
            piece={piece}
            isSelected={selectedSquare === square}
            isPossibleMove={possibleMoves.includes(square)}
            onClick={() => onSquareClick(square)}
            gameStatus={gameStatus}
          />
        );
      })}
    </div>
  );
};
