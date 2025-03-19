// components/Hand.tsx
"use client";

import Card from './Card';

type HandProps = {
  cards: {
    suit: string;
    value: string;
  }[];
};

export default function Hand({ cards }: HandProps) {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}