"use client"

import {useState} from 'react';
import Deck from '../models/Deck';
import {Card, Dealer, Hand, Player} from "@/utils/types";

export default function useGameState() {

    const LIMIT_HAND_SIZE = 21;

    const [deck, setDeck] = useState<Deck>(new Deck());
    const [players, setPlayers] = useState<Player[]>([]);
    const [dealer, setDealer] = useState<Dealer>({id: "", hand: []});
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);

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

        const updatedPlayer = {...player, hand: [...player.hand, drewCard]};

        setPlayers(players.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p)));
        setDeck(new Deck());

        if (!isHandPossible(updatedPlayer.hand)) {
            showDealerHandler(dealer)
            setIsGameOver(true)
            return
        }
    };

    const showDealerHandler = (dealer: Dealer) => {
        dealer.hand[1].isFlipped = false;
        setDealer(prevDealer => ({...prevDealer, hand: [...prevDealer.hand]}));
    }

    const stand = async (player: Player) => {
        showDealerHandler(dealer)

        if (!isHandPossible(dealer.hand)) {
            setIsGameWin(true);
            return
        }

        const dealerHandValue = getHandValue(dealer.hand);
        const playerHandValue = getHandValue(player.hand);

        if (dealerHandValue > playerHandValue) {
            setIsGameOver(true);
            return
        }

        await createDelay(2000);

        let updatedHand = [...dealer.hand];

        while (true) {
            const drewCard = deck.drawCard();

            if (!drewCard) {
                break
            }

            updatedHand = [...updatedHand, drewCard];

            setDealer(prevDealer => ({...prevDealer, hand: updatedHand}));

            if (!isHandPossible(updatedHand)) {
                setIsGameWin(true)
                break
            }

            if (getHandValue(updatedHand) > playerHandValue) {
                setIsGameOver(true)
                break
            }

            await createDelay(1000);
        }
    };

    const isHandPossible = (hand: Hand): boolean => {
        const handValue = getHandValue(hand);

        return handValue <= LIMIT_HAND_SIZE;
    }

    const resetGameState = (): void => {
        setDeck(new Deck());
        setPlayers([])
        setDealer({id: "", hand: []})
        setIsGameOver(false)
        setIsGameWin(false);

        createGameState(dealer, players)
    }

    const createDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const getCardValue = (card: Card): number => {
        const rank = card.rank;

        if (['K', 'Q', 'J'].includes(rank)) {
            return 10;
        } else if (rank === 'A') {
            return 11;
        } else {
            return parseInt(rank, 10);
        }
    };

    const getHandValue = (hand: Hand) => {
        return hand.reduce((acc, card) => {
            if (card.rank == "A" && acc >= 10) {
                return acc + 1;
            }
            return acc + getCardValue(card);

        }, 0)
    }

    return {
        createGameState,
        hit,
        stand,
        players,
        dealer,
        isGameOver,
        isGameWin,
        resetGameState
    };
}