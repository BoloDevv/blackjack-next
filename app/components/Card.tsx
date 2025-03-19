// components/Card.tsx
"use client";

type CardProps = {
  card: {
    suit: string;
    value: string;
  };
};

export default function Card({ card }: CardProps) {
  return (
    <div className="card">
      <div className="card-value">{card.value}</div>
      <div className="card-suit">{card.suit}</div>
    </div>
  );
}