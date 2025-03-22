// components/Hand.tsx
"use client";

import VisualCard from "./VisualCard";
import {Hand} from "@/utils/types";

type HandProps = {
    hand: Hand
};

export default function VisualHand({hand}: HandProps) {
    return (
        <div className="hand">
            {hand.map((card, index) => (
                <VisualCard key={index} card={card}/>
            ))}
        </div>
    );
}