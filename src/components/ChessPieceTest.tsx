import React from 'react';
import { WhiteKing, WhiteQueen, BlackKing } from 'react-chess-pieces';

export const ChessPieceTest = () => {
  return (
    <div className="fixed bottom-0 right-0 bg-white p-4 z-50 rounded-tl-lg shadow-lg">
      <h3 className="text-black font-bold mb-2">Chess Piece Test</h3>
      <div className="flex gap-4">
        <div className="w-16 h-16 border border-gray-300">
          <WhiteKing />
        </div>
        <div className="w-16 h-16 border border-gray-300">
          <WhiteQueen />
        </div>
        <div className="w-16 h-16 border border-gray-300">
          <BlackKing />
        </div>
      </div>
    </div>
  );
};
