import {Card} from "@/utils/types";

export default class Deck {
    cards: Card[];

    constructor() {
        this.cards = this.createDeck();
        this.shuffle();
    }

    createDeck(): Card[] {
        const suits: Card["suit"][] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const rank: Card["rank"][] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        return suits.map(suit => rank.map(rank => {
            return {suit, rank};
        })).flat()
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard(): Card | null {
        const card = this.cards.pop();
        if (card) {
            return card;
        }
        return null
    }
}