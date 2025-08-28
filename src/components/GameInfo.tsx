import React from "react";
import { GameStatus, Player } from "../types/index";
import CrownIcon from "../assets/icons/crown.svg";
import UserIcon from "../assets/icons/user.svg";
import BotIcon from "../assets/icons/bot.svg";

interface GameInfoProps {
  gameStatus: GameStatus;
  player: Player;
  opponent: Player;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  gameStatus,
  player,
  opponent,
}) => {
  const { turn, isCheck, isCheckmate, isStalemate, isDraw } = gameStatus;

  const getPlayerIcon = (player: Player) => {
    if (player.name === "Bot") {
      return <img src={BotIcon} alt="Bot" className="w-6 h-6" />;
    }
    return <img src={UserIcon} alt="User" className="w-6 h-6" />;
  };

  const renderStatus = () => {
    if (isCheckmate) {
      return (
        <div className="flex items-center gap-2 text-yellow-400">
          <img src={CrownIcon} alt="Winner" className="w-6 h-6" />
          <span>{turn === "w" ? "Black" : "White"} wins!</span>
        </div>
      );
    }
    if (isStalemate) return <span>Stalemate</span>;
    if (isDraw) return <span>Draw</span>;
    if (isCheck) return <span className="text-red-500">Check!</span>;
    return <span>{turn === "w" ? "White" : "Black"}'s turn</span>;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {getPlayerIcon(player)}
          <span className="font-semibold">{player.name}</span>
        </div>
        <div className="text-xl font-bold">vs</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{opponent.name}</span>
          {getPlayerIcon(opponent)}
        </div>
      </div>
      <div className="text-center text-2xl font-semibold">{renderStatus()}</div>
    </div>
  );
};
