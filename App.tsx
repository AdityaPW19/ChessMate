
import React, { useState, useCallback } from "react";
import { Board } from "./src/components/Board";
import { Controls } from "./src/components/Controls";
import { GameInfo } from "./src/components/GameInfo";
import { GameStatusModal } from "./src/components/GameStatusModal";
import { ModeSelector } from "./src/components/ModeSelector";
import { CapturedPieces } from "./src/components/CapturedPieces";
import { useChessGame } from "./src/hooks/useChessGame";
import { Difficulty, GameMode, Player } from "./src/types/index";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("pve");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [player, setPlayer] = useState<Player>({ name: "Player", color: "w" });
  const [opponent, setOpponent] = useState<Player>({ name: "Bot", color: "b" });

  const {
    board,
    boardOrientation,
    gameStatus,
    selectedSquare,
    possibleMoves,
    capturedPieces,
    handleSquareClick,
    resetGame,
    undoMove,
    setBoardOrientation,
  } = useChessGame(gameMode, difficulty, player);

  const handleStartGame = useCallback(
    (mode: GameMode, diff: Difficulty, playerColor: "w" | "b") => {
      setGameMode(mode);
      setDifficulty(diff);
      setPlayer({
        name: "Player",
        color: playerColor,
      });
      setOpponent({
        name: mode === "pve" ? "Bot" : "Player 2",
        color: playerColor === "w" ? "b" : "w",
      });
      setBoardOrientation(playerColor);
      setGameStarted(true);
      resetGame();
    },
    [resetGame, setBoardOrientation]
  );

  const handlePlayAgain = useCallback(() => {
    setGameStarted(false);
    resetGame();
  }, [resetGame]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <ModeSelector onStartGame={handleStartGame} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <GameInfo
            gameStatus={gameStatus}
            player={player.color === "w" ? player : opponent}
            opponent={player.color === "w" ? opponent : player}
          />
          <div className="mt-4 w-full">
            <CapturedPieces
              pieces={capturedPieces.b}
              color="b"
            />
          </div>
        </div>

        <div className="w-full max-w-lg lg:w-1/2">
          <Board
            board={board}
            boardOrientation={boardOrientation}
            gameStatus={gameStatus}
            selectedSquare={selectedSquare}
            possibleMoves={possibleMoves}
            onSquareClick={handleSquareClick}
          />
        </div>

        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <GameInfo
            gameStatus={gameStatus}
            player={player.color === "b" ? player : opponent}
            opponent={player.color === "b" ? opponent : player}
          />
          <div className="mt-4 w-full">
            <CapturedPieces
              pieces={capturedPieces.w}
              color="w"
            />
          </div>
          <div className="mt-8 w-full">
            <Controls onNewGame={() => setGameStarted(false)} onUndo={undoMove} />
          </div>
        </div>
      </div>
      <GameStatusModal status={gameStatus} onPlayAgain={handlePlayAgain} />
    </div>
  );
}

export default App;
