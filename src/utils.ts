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

export function getHandTotal(hand: string[]): number {
    let total = 0;
    
    hand.forEach(card => {
        switch(card.slice(0, -1)) {
            case "A":
                total += 11;
                break;
            case "Q":
            case "J":
            case "K":
                total += 10;
                break;
            default:
                total += Number(card.slice(0, -1));
                break;
        }
    })

    return total;
}