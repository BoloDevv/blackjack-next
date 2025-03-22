"use client"

import { useState } from 'react';
import Deck from '../models/Deck';
import { Dealer, Hand, Player } from "@/utils/types";

export default function useGameState() {
    const [deck, setDeck] = useState<Deck>(new Deck());
    const [players, setPlayers] = useState<Player[]>([]);
    const [dealer, setDealer] = useState<Dealer>({ id: "", hand: [] });
    const [isGameLost, setIsGameLost] = useState(false);

    const createGameState = (dealer: Dealer, players: Player[]) => {
        const initialDeck = new Deck();
        if(!deck){
            return
        }

        setDeck(initialDeck);

        initializePlayers(players, initialDeck);
        initializeDealer(dealer, initialDeck);
    };

    const initializeHand = (player: Player | Dealer, initialDeck: Deck) => {
        if(!deck) {
            return
        }

        const initialHand: Hand = [];

        if(!deck){
            return
        }

        for (let i = 0; i < 2; i++) {
            const drewCard = initialDeck.drawCard();
            if (!drewCard) return;
            initialHand.push(drewCard);
        }

        player.hand = initialHand;
    };

    const initializePlayers = (players: Player[], initialDeck: Deck) => {
        if(!deck){
            return
        }
        const updatedPlayers = players.map(player => {
            initializeHand(player, initialDeck);
            return player;
        });
        setPlayers(updatedPlayers);
    };

    const initializeDealer = (dealer: Dealer, initialDeck: Deck) => {
        initializeHand(dealer, initialDeck);
        setDealer(dealer);
    };

    const hit = (player: Player) => {
        const drewCard = deck.drawCard();
        if (!drewCard) {
            return;
        }

        const updatedPlayer = { ...player, hand: [...player.hand, drewCard] };

        if(!isHandPossible) {
            setIsGameLost(true)
            return
        }

        setPlayers(players.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p)));
        setDeck(new Deck());
    };

    const isHandPossible = (hand: Hand): boolean => {

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