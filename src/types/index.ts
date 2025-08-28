import { Chess, Move, Piece, Square } from "chess.js";

export type GameMode = "pvp" | "pve";
export type Difficulty = "easy" | "medium" | "hard";
export type BoardOrientation = "white" | "black";
export type Promote = "q" | "r" | "b" | "n";

export interface Player {
  name: string;
  color: "w" | "b";
}

export interface GameStatus {
  turn: "w" | "b";
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
}

export interface CapturedPieces {
  w: Piece[];
  b: Piece[];
}
