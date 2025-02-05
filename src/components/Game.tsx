import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Cards } from "../data/cards";
import { ICard } from "../types/card.interface";
import Card from "./Card";

const Game: FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  let foundedCards: ICard[] = [];
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [facedCards, setFacedCards] = useState<ICard[]>([]);

  const handleReset = () => {
    setCards(shuffleCards(Cards));
    setIsGameFinished(false);
  };

  useEffect(() => {
    const shuffledCards = shuffleCards(Cards);
    setCards(shuffledCards);
  }, []);

  const shuffleCards = (cards: ICard[]): ICard[] => {
    const shuffled: ICard[] = [];
    const usedCards: number[] = [];
    while (shuffled.length < cards.length) {
      let cardIndex = Math.floor(Math.random() * cards.length);
      if (!usedCards.includes(cardIndex)) {
        let currentCard: ICard = { ...cards[cardIndex], isFaceUp: false };
        usedCards.push(cardIndex);
        shuffled.push(currentCard);
      }
    }
    return shuffled;
  };

  const handleCardClick = (card: ICard) => {
    if (card.isFaceUp || facedCards.length === 2) return;

    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, isFaceUp: true } : c))
    );

    setFacedCards((prev) => {
      const newFacedCards = [...prev, card];

      if (newFacedCards.length === 2) {
        const [firstCard, secondCard] = newFacedCards;

        if (firstCard.title === secondCard.title) {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((c) =>
                c.id === firstCard.id || c.id === secondCard.id
                  ? { ...c, isFounded: true }
                  : c
              )
            );
            foundedCards = cards.filter((c) => c.isFounded === true);
            if (foundedCards.length === Cards.length - 2)
              setIsGameFinished(true);
          }, 1000);
        } else {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((c) =>
                c.id === firstCard.id || c.id === secondCard.id
                  ? { ...c, isFaceUp: false }
                  : c
              )
            );
          }, 1000);
        }
        return [];
      }

      return newFacedCards;
    });
  };

  return (
    <>
      {isGameFinished ? (
        <div className="text-center translate-y-[200px]">
          <h1 className="text-5xl font-bold my-5 text-yellow-400">
            Game Over!
          </h1>
          <button
            onClick={handleReset}
            className="text-4xl text-white px-7 py-2 cursor-pointer hover:bg-green-300 transition-colors duration-200 my-3 rounded-xl border border-black bg-green-400"
          >
            Reset
          </button>
          <div>
            <NavLink
              to="/"
              className="inline-block text-4xl text-white px-7 py-2 cursor-pointer hover:bg-red-500 transition-colors duration-200 my-3 rounded-xl border border-black bg-red-600"
            >
              Main Menu
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-15 gap-y-10 mt-4 ">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={(card) => handleCardClick(card)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Game;
