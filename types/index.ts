export type GameMode = "pvp" | "pve";
export type Difficulty = "easy" | "medium" | "hard";
export type BoardOrientation = "white" | "black";
export type Promote = "q" | "r" | "b" | "n";

export interface Player {
  name: string;
  color: "w" | "b";
}

export interface GameStatus {
  isCheckmate: boolean;
  isDraw: boolean;
  isStalemate: boolean;
  isThreefoldRepetition: boolean;
  isInsufficientMaterial: boolean;
  isGameOver: boolean;
  isInCheck: boolean;
  turn: 'w' | 'b';
  winner: 'w' | 'b' | 'draw' | null;
}

export interface Piece {
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  color: 'w' | 'b';
}

export interface Move {
  from: string;
  to: string;
  promotion?: 'n' | 'b' | 'r' | 'q';
}

export interface IChessInstance {
  fen(): string;
  move(move: string | Move): any;
  turn(): 'w' | 'b';
  in_check(): boolean;
  in_checkmate(): boolean;
  in_stalemate(): boolean;
  in_draw(): boolean;
  game_over(): boolean;
  history(options: { verbose: true }): any[];
  reset(): void;
  undo(): any;
  get(square: string): Piece | null;
  moves(options: { square: string; verbose: true }): any[];
  in_threefold_repetition(): boolean;
  insufficient_material(): boolean;
}

