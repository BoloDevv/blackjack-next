// components/Game.tsx
"use client";

import { useState } from 'react';
import Deck from './Deck';
import Hand from './Hand';

export default function Game() {
  const [deck] = useState(new Deck());
  const [playerHand, setPlayerHand] = useState<{ suit: string; value: string }[]>([]);
  const [dealerHand, setDealerHand] = useState<{ suit: string; value: string }[]>([]);

  const startGame = () => {
    const playerCard1 = deck.drawCard();
    const playerCard2 = deck.drawCard();
    const dealerCard1 = deck.drawCard();
    const dealerCard2 = deck.drawCard();

    if (playerCard1 && playerCard2 && dealerCard1 && dealerCard2) {
      setPlayerHand([playerCard1, playerCard2]);
      setDealerHand([dealerCard1, dealerCard2]);
    }
  };

  const hit = () => {
    const newCard = deck.drawCard();
    if (newCard) {
      setPlayerHand([...playerHand, newCard]);
    }
  };

  const stand = () => {
    // Lógica para o dealer jogar
  };

  return (
    <div>
      <button onClick={startGame}>Começar Jogo</button>
      <div>
        <h2>Dealer</h2>
        <Hand cards={dealerHand} />
      </div>
      <div>
        <h2>Jogador</h2>
        <Hand cards={playerHand} />
      </div>
      <button onClick={hit}>Hit</button>
      <button onClick={stand}>Stand</button>
    </div>
  );
}