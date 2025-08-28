
import React from 'react';
import { Piece as PieceComponent } from './Piece';
import { Piece, GameStatus } from '../../types';

interface SquareProps {
  isLight: boolean;
  piece: Piece | null;
  isSelected: boolean;
  isPossibleMove: boolean;
  onClick: () => void;
  gameStatus: GameStatus;
}

export const Square: React.FC<SquareProps> = ({ isLight, piece, isSelected, isPossibleMove, onClick, gameStatus }) => {
  const motion = typeof window !== 'undefined' ? (window as any).motion : null;
  const squareBgColor = isLight ? 'bg-slate-300' : 'bg-slate-700';
  const isKingInCheck = piece?.type === 'k' && piece?.color === gameStatus.turn && (gameStatus.isCheckmate || gameStatus.isInCheck);
  
  
  return (
    <div
      className={`w-full h-full flex items-center justify-center relative ${squareBgColor}`}
      onClick={onClick}
    >
      {isSelected && motion ? (
        <motion.div
          className="absolute inset-0 border-4 border-yellow-400"
          layoutId="selector"
        />
      ) : isSelected ? (
        <div className="absolute inset-0 border-4 border-yellow-400" />
      ) : null}
      {piece && <PieceComponent piece={piece} isKingInCheck={isKingInCheck} />}
      {isPossibleMove && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 bg-emerald-400/50 rounded-full"></div>
        </div>
      )}
    </div>
  );
};
