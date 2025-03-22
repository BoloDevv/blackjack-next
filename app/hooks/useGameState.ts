import {useState} from 'react';
import Deck from '../models/Deck';
import {Dealer, Hand, Player} from "@/utils/types";

export default function useGameState() {
    const [deck, setDeck] = useState(new Deck());
    const [players, setPlayers] = useState<Player[]>([]);
    const [dealer, setDealer] = useState<Dealer>({id: "", hand: []});

    const createGameState = (dealer: Dealer, players: Player[]) => {

        initializePlayers(players, deck)
        initializeDealer(dealer, deck)
    };

    const initializeHand = (player: Player | Dealer, initialDeck: Deck) => {
        const initialHand: Hand = []

        for (let i = 0; i < 2; i++) {
            const drewCard = initialDeck.drawCard()
            if (!drewCard) return
            initialHand.push(drewCard);
        }

        player.hand = initialHand
    }

    const initializePlayers = (players: Player[], initialDeck: Deck) => {
        players.forEach(player => initializeHand(player, initialDeck))
        setPlayers(players)
    }

    const initializeDealer = (dealer: Dealer, initialDeck: Deck) => {
        initializeHand(dealer, initialDeck)
        setDealer(dealer)
    }

    const hit = (player: Player) => {
        const drewCard = deck.drawCard();
        if (!drewCard) {
            return
        }

        setDeck(deck)
        player.hand.push(drewCard)
    };

    const stand = (dealer: Dealer) => {
        const drewCard = deck.drawCard();
        if (!drewCard) {
            return
        }
        dealer.hand.push(drewCard)
    };

    return {
        createGameState,
        hit,
        stand,
        players,
        dealer
    };
}