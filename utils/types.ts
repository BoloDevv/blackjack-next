type CardSuit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Q' | 'J' | 'K' | 'A'
export type Card = { suit: CardSuit; rank: CardRank; isFlipped: boolean };

export type Hand = Card[]

export type PokerAction = 'hit' | 'stand' | 'split'

export interface Player {
    id: string;
    name: string;
    hand: Hand
}

export interface Dealer {
    id: string;
    hand: Hand
}
