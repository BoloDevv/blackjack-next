import { useState } from 'react';
import Deck from '../models/Deck';
import { Dealer, Hand, Player } from "@/utils/types";

export default function useGameState() {
    const [deck, setDeck] = useState<Deck>(new Deck());
    const [players, setPlayers] = useState<Player[]>([]);
    const [dealer, setDealer] = useState<Dealer>({ id: "", hand: [] });

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

        // Cria uma cópia do jogador e adiciona a nova carta à mão
        const updatedPlayer = { ...player, hand: [...player.hand, drewCard] };

        // Atualiza o estado dos jogadores
        setPlayers(players.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p)));
        setDeck(new Deck(deck.cards)); // Atualiza o estado do baralho
    };

    const stand = (dealer: Dealer) => {
        const drewCard = deck.drawCard();
        if (!drewCard) {
            alert("O baralho está vazio!");
            return;
        }
    };

    return {
        createGameState,
        hit,
        stand,
        players,
        dealer
    };
}