import { Chess } from "chess.js";
import { Difficulty } from "../src/types/index";

const makeRandomMove = (game: Chess) => {
  const moves = game.moves({ verbose: true });
  const move = moves[Math.floor(Math.random() * moves.length)];
  return move;
};

const makeBestMove = (game: Chess) => {
  const moves = game.moves({ verbose: true });
  let bestMove = null;
  let bestValue = -9999;

  for (const move of moves) {
    const gameCopy = new Chess(game.fen());
    gameCopy.move(move);
    const boardValue = evaluateBoard(gameCopy);
    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  }

  return bestMove || makeRandomMove(game);
};

const evaluateBoard = (game: Chess) => {
  let totalValue = 0;
  game.board().forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        totalValue += getPieceValue(piece);
      }
    });
  });
  return totalValue;
};

const getPieceValue = (piece: any) => {
  if (piece === null) {
    return 0;
  }
  const getAbsoluteValue = (piece: any) => {
    if (piece.type === "p") {
      return 10;
    } else if (piece.type === "r") {
      return 50;
    } else if (piece.type === "n") {
      return 30;
    } else if (piece.type === "b") {
      return 30;
    } else if (piece.type === "q") {
      return 90;
    } else if (piece.type === "k") {
      return 900;
    }
    throw "Unknown piece type: " + piece.type;
  };

  const absoluteValue = getAbsoluteValue(piece);
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

const minimaxRoot = (game: Chess, depth: number, isMaximizingPlayer: boolean) => {
    const newGameMoves = game.moves({ verbose: true });
    let bestMove = -9999;
    let bestMoveFound = null;

    for (let i = 0; i < newGameMoves.length; i++) {
        const newGameMove = newGameMoves[i];
        const gameCopy = new Chess(game.fen());
        gameCopy.move(newGameMove);
        const value = minimax(depth - 1, gameCopy, !isMaximizingPlayer);
        if (value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

const minimax = (depth: number, game: Chess, isMaximizingPlayer: boolean): number => {
    if (depth === 0) {
        return -evaluateBoard(game);
    }

    const newGameMoves = game.moves({ verbose: true });

    if (isMaximizingPlayer) {
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            const gameCopy = new Chess(game.fen());
            gameCopy.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, gameCopy, !isMaximizingPlayer));
        }
        return bestMove;
    } else {
        let bestMove = 9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            const gameCopy = new Chess(game.fen());
            gameCopy.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, gameCopy, !isMaximizingPlayer));
        }
        return bestMove;
    }
};

export const makeBotMove = (game: Chess, difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return makeRandomMove(game);
    case "medium":
      return makeBestMove(game);
    case "hard":
      return minimaxRoot(game, 2, true);
    default:
      return makeRandomMove(game);
  }
};
