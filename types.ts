
export type PlayerColor = 'w' | 'b';

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface Piece {
  type: PieceType;
  color: PlayerColor;
}

export interface Square {
  square: string;
  piece: Piece | null;
}

export interface GameStatus {
  isCheckmate: boolean;
  isDraw: boolean;
  isStalemate: boolean;
  isThreefoldRepetition: boolean;
  isInsufficientMaterial: boolean;
  isGameOver: boolean;
  isInCheck: boolean; // Added to track check status
  turn: PlayerColor;
  winner: PlayerColor | 'draw' | null;
}

// Type declarations for libraries loaded from CDN
declare global {
  interface Window {
    Chess: new (fen?: string) => IChessInstance;
    confetti: (options?: any) => void;
    motion: any; // From Framer Motion
  }
}

export type Move = {
  to: string;
  from: string;
  promotion?: string;
};

export interface IChessInstance {
  // Chess.js 0.10.2 doesn't actually have a board() method that returns a 2D array,
  // so we're using get() method instead to build our own board
  turn: () => PlayerColor;
  fen: () => string;
  move: (move: Move | string) => { from: string; to: string; piece: PieceType } | null;
  undo: () => { from: string; to: string; piece: PieceType } | null;
  reset: () => void;
  load: (fen: string) => boolean;
  in_check: () => boolean;
  in_checkmate: () => boolean;
  in_stalemate: () => boolean;
  in_draw: () => boolean;
  in_threefold_repetition: () => boolean;
  insufficient_material: () => boolean;
  game_over: () => boolean;
  moves: (options: { square?: string; verbose: true }) => { to: string; from: string; flags: string }[];
  get: (square: string) => { type: PieceType; color: PlayerColor } | null;
  history: (options: { verbose: true }) => any[];
}
