// components/Card.tsx
"use client";

import {Card} from "@/utils/types";

type CardProps = {
    card: Card
};

export const getCardValue = (card: Card): number => {
    const rank = card.rank;

    if (['K', 'Q', 'J'].includes(rank)) {
        return 10;
    } else if (rank === 'A') {
        return 11;
    } else {
        return parseInt(rank, 10);
    }
};

export default function VisualCard({card}: CardProps) {

    return (
        <div className="card">
            <div className="card-value">{getCardValue(card)}</div>
            <div className="card-suit">{card.suit}</div>
        </div>
    );
}