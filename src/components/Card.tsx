import { FC } from "react";
import { ICard } from "../types/card.interface";
import { FaQuestion } from "react-icons/fa";

interface CardProps {
  card: ICard;
  onClick: (card: ICard) => void;
}

const Card: FC<CardProps> = ({ card, onClick }) => {
  return (
    <>
      {card.isFounded ? (
        <div className="h-[140px] bg-transparent"></div>
      ) : card.isFaceUp ? (
        <div className="h-[140px] border bg-white flex items-center justify-center">
          <img src={card.image} alt={card.title} />
        </div>
      ) : (
        <div
          onClick={() => onClick(card)}
          className="h-[140px] border bg-yellow-400 flex items-center justify-center cursor-pointer"
        >
          <FaQuestion className="text-red-600 text-6xl" />
        </div>
      )}
    </>
  );
};

export default Card;
