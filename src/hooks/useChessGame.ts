
import { useState, useMemo, useCallback, useEffect } from 'react';
import { GameStatus, IChessInstance, Move, Piece, BoardOrientation, GameMode, Difficulty, Player } from '../../types';
import { makeBotMove } from '../../game/bot';

const chess = typeof window !== 'undefined' && (window as any).Chess 
  ? new (window as any).Chess() 
  : null;

export const useChessGame = (
  gameMode: GameMode,
  difficulty: Difficulty,
  player: Player
) => {
  const [chessInstance] = useState<IChessInstance>(() => {
    if (!chess && typeof window !== 'undefined' && (window as any).Chess) {
      return new (window as any).Chess();
    }
    return chess as IChessInstance;
  });
  
  if (!chessInstance) {
    throw new Error('Chess.js library not loaded or initialized properly');
  }
  
  const [fen, setFen] = useState(chessInstance.fen());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [boardOrientation, setBoardOrientation] = useState<BoardOrientation>('white');
  const [capturedPieces, setCapturedPieces] = useState<{ w: Piece[]; b: Piece[] }>({ w: [], b: [] });
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    isCheckmate: false,
    isDraw: false,
    isStalemate: false,
    isThreefoldRepetition: false,
    isInsufficientMaterial: false,
    isGameOver: false,
    isInCheck: false,
    turn: 'w',
    winner: null,
  });

  const updateCapturedPieces = useCallback(() => {
    const history = chessInstance.history({ verbose: true });
    const captured = { w: [], b: [] };

    for (const move of history) {
      if (move.captured) {
        const piece = {
          type: move.captured,
          color: move.color === "w" ? "b" : "w",
        } as Piece;
        if (piece.color === "w") {
          captured.b.push(piece);
        } else {
          captured.w.push(piece);
        }
      }
    }
    setCapturedPieces(captured);
  }, [chessInstance]);

  const updateGameStatus = useCallback(() => {
    const isGameOver = chessInstance.game_over();
    const isCheckmate = chessInstance.in_checkmate();
    const isDraw = chessInstance.in_draw();
    const turn = chessInstance.turn();
    const isInCheck = chessInstance.in_check();

    let winner: GameStatus['winner'] = null;
    if (isCheckmate) {
        winner = turn === 'w' ? 'b' : 'w';
    } else if (isDraw) {
        winner = 'draw';
    }

    setGameStatus({
      isCheckmate,
      isDraw,
      isStalemate: chessInstance.in_stalemate(),
      isThreefoldRepetition: chessInstance.in_threefold_repetition(),
      isInsufficientMaterial: chessInstance.insufficient_material(),
      isGameOver,
      isInCheck,
      turn,
      winner
    });
    updateCapturedPieces();
  }, [chessInstance, updateCapturedPieces]);

  const isBotTurn = useMemo(() => {
    return (
      gameMode === "pve" &&
      player.color !== gameStatus.turn &&
      !gameStatus.isGameOver
    );
  }, [gameMode, player, gameStatus]);

  useEffect(() => {
    if (isBotTurn) {
      const botMove = makeBotMove(chessInstance, difficulty);
      if (botMove) {
        setTimeout(() => {
          chessInstance.move(botMove);
          setFen(chessInstance.fen());
          updateGameStatus();
        }, 1000);
      }
    }
  }, [isBotTurn, chessInstance, difficulty, updateGameStatus]);

  useEffect(() => {
    updateGameStatus();
  }, [fen, updateGameStatus]);

  const board = useMemo(() => {
    const flatBoard: { square: string; piece: Piece | null }[] = [];
    
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = String.fromCharCode(97 + j) + (8 - i);
        const piece = chessInstance.get(square);
        flatBoard.push({
          square,
          piece: piece ? { type: piece.type, color: piece.color } : null
        });
      }
    }
    
    return flatBoard;
  }, [fen, chessInstance]);
  
  const movePiece = useCallback((move: Move) => {
    const result = chessInstance.move(move);
    if (result) {
      setFen(chessInstance.fen());
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
    return result;
  }, [chessInstance]);
  
  const handleSquareClick = useCallback((square: string) => {
    if (isBotTurn) return;
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    const piece = chessInstance.get(square);
    if (piece && piece.color === chessInstance.turn()) {
      setSelectedSquare(square);
      const moves = chessInstance.moves({ square, verbose: true }).map(move => move.to);
      setPossibleMoves(moves);
    } else if (selectedSquare && possibleMoves.includes(square)) {
        movePiece({ from: selectedSquare, to: square });
    } else {
        setSelectedSquare(null);
        setPossibleMoves([]);
    }
  }, [selectedSquare, possibleMoves, movePiece, chessInstance, isBotTurn]);
  
  const resetGame = useCallback(() => {
    chessInstance.reset();
    setFen(chessInstance.fen());
    setSelectedSquare(null);
    setPossibleMoves([]);
    updateGameStatus();
  }, [updateGameStatus, chessInstance]);

  const undoMove = useCallback(() => {
    chessInstance.undo();
    setFen(chessInstance.fen());
    setSelectedSquare(null);
    setPossibleMoves([]);
    updateGameStatus();
  }, [updateGameStatus, chessInstance]);

  return {
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
  };
};


