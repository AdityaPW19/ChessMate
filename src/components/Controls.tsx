
import React from 'react';

interface ControlsProps {
  onNewGame: () => void;
  onUndo: () => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode, className?: string }> = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 text-lg font-bold rounded-xl text-white transform transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg ${className}`}
    >
        {children}
    </button>
);


export const Controls: React.FC<ControlsProps> = ({ onNewGame, onUndo }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <ControlButton onClick={onNewGame} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 w-full">
                New Game
            </ControlButton>
            <ControlButton onClick={onUndo} className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 w-full">
                Undo
            </ControlButton>
        </div>
    );
};
