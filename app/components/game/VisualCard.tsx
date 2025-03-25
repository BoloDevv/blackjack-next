"use client";

import {Card} from "@/utils/types";
import Image from "next/image";

type CardProps = {
    card: Card
};

export default function VisualCard(props: CardProps) {
    const {card} = props;


    const cardBackUrl = "/Flat Playing Cards Set/Back Covers/Sun Flower.png"
    const cardUrl = `/Flat Playing Cards Set/${card.suit}/${card.rank}.png`
    return (
        <div className="mx-1 w-full h-full">
            {card.isFlipped ? (
                <Image src={cardBackUrl} width={90} height={90} alt="back of card image" className="antialiased"
                       quality={100} unoptimized priority/>
            ) : (
                <Image src={cardUrl} width={90} height={90} alt="card image" quality={100} unoptimized priority/>
            )}
        </div>
    );
}