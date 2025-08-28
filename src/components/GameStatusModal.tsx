
import React from 'react';
import { GameStatus } from '../../types';

interface GameStatusModalProps {
  status: GameStatus;
  onPlayAgain: () => void;
}

export const GameStatusModal: React.FC<GameStatusModalProps> = ({ status, onPlayAgain }) => {
    const motion = (window as any).motion;
    if (!status.isGameOver) {
        return null;
    }

    let title = '';
    let message = '';

    if (status.isCheckmate) {
        title = 'Checkmate!';
        message = `${status.winner === 'w' ? 'White' : 'Black'} wins!`;
    } else if (status.isDraw) {
        title = 'Draw!';
        if (status.isStalemate) message = 'The game is a stalemate.';
        else if (status.isThreefoldRepetition) message = 'Draw by threefold repetition.';
        else if (status.isInsufficientMaterial) message = 'Draw due to insufficient material.';
        else message = 'The game is a draw.';
    }

    return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div 
                className="bg-slate-800 p-8 rounded-2xl shadow-lg text-center text-white border-2 border-slate-600"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{title}</h2>
                <p className="text-xl mb-8 text-slate-300">{message}</p>
                <button
                    onClick={onPlayAgain}
                    className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transform hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                    Play Again
                </button>
            </motion.div>
        </div>
    );
};
