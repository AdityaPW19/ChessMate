import React from "react";
import { Piece as PieceType } from "chess.js";
import { Piece } from "./Piece";

interface CapturedPiecesProps {
  pieces: PieceType[];
  color: "w" | "b";
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({
  pieces,
  color,
}) => {
  const getPieceValue = (piece: PieceType) => {
    switch (piece.type) {
      case "p":
        return 1;
      case "n":
        return 3;
      case "b":
        return 3;
      case "r":
        return 5;
      case "q":
        return 9;
      default:
        return 0;
    }
  };

  const totalValue = pieces.reduce(
    (acc, piece) => acc + getPieceValue(piece),
    0
  );

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">
        {color === "w" ? "White" : "Black"} Captured ({totalValue})
      </h3>
      <div className="flex flex-wrap gap-2 bg-gray-800 p-2 rounded-lg">
        {pieces.map((piece, index) => (
          <div key={index} className="w-8 h-8">
            <Piece piece={piece} size={32} />
          </div>
        ))}
      </div>
    </div>
  );
};
