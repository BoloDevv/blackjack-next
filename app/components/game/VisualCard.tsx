"use client";

import {Card} from "@/utils/types";
import Image from "next/image";

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
    const url = `/Flat Playing Cards Set/${card.suit}/${card.rank}.png`
    return (
        <div className="mx-1 w-full h-full">
            <Image src={url} width={90} height={90} alt="card image" className="antialiased"/>
        </div>
    );
}