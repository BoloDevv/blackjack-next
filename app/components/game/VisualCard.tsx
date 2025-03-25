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

export default function VisualCard(props: CardProps) {
    const {card} = props;


    const cardBackUrl = "/Flat Playing Cards Set/Back Covers/Sun Flower.png"
    const cardUrl = `/Flat Playing Cards Set/${card.suit}/${card.rank}.png`
    return (
        <div className="mx-1 w-full h-full">
            {card.isFlipped ? (
                <Image src={cardBackUrl} width={90} height={90} alt="back of card image" className="antialiased" quality={100} unoptimized priority/>
            ) : (
                <Image src={cardUrl} width={90} height={90} alt="card image" quality={100} unoptimized priority/>
            )}
        </div>
    );
}