"use client"

import { useState } from 'react';
import Deck from '../models/Deck';
import { Dealer, Hand, Player } from "@/utils/types";
import {getCardValue} from "@/app/components/game/VisualCard";

export default function useGameState() {

    const LIMIT_HAND_SIZE = 21;

    const [deck, setDeck] = useState<Deck>(new Deck());
    const [players, setPlayers] = useState<Player[]>([]);
    const [dealer, setDealer] = useState<Dealer>({ id: "", hand: [] });
    const [isGameLost, setIsGameLost] = useState(false);

    const createGameState = (dealer: Dealer, players: Player[]) => {
        const initialDeck = new Deck();

        setDeck(initialDeck);

        initializePlayers(players, initialDeck);
        initializeDealer(dealer, initialDeck);
    };

    const initializeHand = (player: Player | Dealer, initialDeck: Deck) => {
        const initialHand: Hand = [];

        for (let i = 0; i < 2; i++) {
            const drewCard = initialDeck.drawCard();
            if (!drewCard) return;
            initialHand.push(drewCard);
        }

        player.hand = initialHand;
    };

    const initializePlayers = (players: Player[], initialDeck: Deck) => {
        const updatedPlayers = players.map(player => {
            initializeHand(player, initialDeck);
            return player;
        });
        setPlayers(updatedPlayers);
    };

    const initializeDealer = (dealer: Dealer, initialDeck: Deck) => {
        initializeHand(dealer, initialDeck);
        dealer.hand[1].isFlipped = true
        setDealer(dealer);
    };

    const hit = (player: Player) => {
        const drewCard = deck.drawCard();
        if (!drewCard) {
            return;
        }

        const updatedPlayer = { ...player, hand: [...player.hand, drewCard] };

        setPlayers(players.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p)));
        setDeck(new Deck());

        if(!isHandPossible(updatedPlayer.hand)) {
            setIsGameLost(true)
            return
        }
    };

    const isHandPossible = (hand: Hand): boolean => {
        const aces = hand.filter(c => c.rank === "A")
        const withoutAces = hand.filter(c => c.rank !== "A")

        let total = withoutAces.reduce((sum, card) => sum + getCardValue(card), 0);

        if(total > LIMIT_HAND_SIZE) {
            return false
        }

        aces.forEach((card) => {
            if(total <= 10) {
                total += getCardValue(card);
            } else {
                total += 1
            }
        })

        return total <= LIMIT_HAND_SIZE;
    }

    const resetGameState = (): void => {
        setDeck(new Deck());
        setPlayers([])
        setDealer({ id: "", hand: [] })
        setIsGameLost(false)

        createGameState(dealer, players)
    }

    const stand = (dealer: Dealer) => {
        throw new Error("Not implemented");
    };

    return {
        createGameState,
        hit,
        stand,
        players,
        dealer,
        isGameLost,
        resetGameState
    };
}