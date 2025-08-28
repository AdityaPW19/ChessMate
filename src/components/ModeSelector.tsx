import React from "react";
import { Difficulty, GameMode } from "../types/index";

interface ModeSelectorProps {
  onStartGame: (mode: GameMode, difficulty: Difficulty, playerColor: "w" | "b") => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onStartGame }) => {
  const [mode, setMode] = React.useState<GameMode>("pve");
  const [difficulty, setDifficulty] = React.useState<Difficulty>("easy");
  const [playerColor, setPlayerColor] = React.useState<"w" | "b">("w");

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl text-white">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to ChessMate
      </h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Game Mode</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setMode("pve")}
            className={`w-full py-3 rounded-lg font-semibold ${
              mode === "pve"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Player vs Bot
          </button>
          <button
            onClick={() => setMode("pvp")}
            className={`w-full py-3 rounded-lg font-semibold ${
              mode === "pvp"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Player vs Player
          </button>
        </div>
      </div>

      {mode === "pve" && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Difficulty</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setDifficulty("easy")}
              className={`w-full py-3 rounded-lg font-semibold ${
                difficulty === "easy"
                  ? "bg-green-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty("medium")}
              className={`w-full py-3 rounded-lg font-semibold ${
                difficulty === "medium"
                  ? "bg-yellow-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty("hard")}
              className={`w-full py-3 rounded-lg font-semibold ${
                difficulty === "hard"
                  ? "bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Hard
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Choose your color</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setPlayerColor("w")}
            className={`w-full py-3 rounded-lg font-semibold ${
              playerColor === "w"
                ? "bg-gray-200 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            White
          </button>
          <button
            onClick={() => setPlayerColor("b")}
            className={`w-full py-3 rounded-lg font-semibold ${
              playerColor === "b"
                ? "bg-gray-900 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Black
          </button>
        </div>
      </div>

      <button
        onClick={() => onStartGame(mode, difficulty, playerColor)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-xl"
      >
        Start Game
      </button>
            <footer className="text-slate-500 text-center mt-8">
        By PW Game Studios
      </footer>
    </div>
  );
};
