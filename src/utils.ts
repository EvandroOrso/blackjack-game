export function shuffleDeck(deck: string[]): string[] {
    for(let i = deck.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; 
    }
    return deck;
};

interface InitialCards {
    card1: string;
    card2: string;
}

export function getInitialCards(deck: string[]): InitialCards[] {
    let playerCards: InitialCards = {
        card1: deck[deck.length - 1],
        card2: deck[deck.length - 2]
    }

    let dealerCards: InitialCards = {
        card1: deck[deck.length - 3],
        card2: deck[deck.length - 4]
    }

    return [playerCards, dealerCards];
}