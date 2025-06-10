import PromptSync from "prompt-sync";
const prompt = PromptSync();
import deck from "./deck";
import player from "./player";
import { shuffleDeck, getInitialCards, getHandTotal } from "./utils";

// Data
let isGameRunning = false;
let playerHand: string[] = [];
let dealerHand: string[] = [];

// Initialize game
function initializeGame() {
    isGameRunning = true;

    // Asks for a bet
    console.log(`Player's funds: $${player.balance}`);
    let bet = Number(prompt(`Enter your bet: $`));
    while(bet > player.balance || isNaN(bet) || bet === 0) {
        bet = Number(prompt(`Please insert a valid value: $`));
    }
    
    // Shuffle deck and get initial cards
    const shuffledDeck = shuffleDeck(deck);
    let initialCards = getInitialCards(shuffledDeck);

    // Giving initial cards
    playerHand.push(initialCards[0].card1);
    playerHand.push(initialCards[0].card2);
    dealerHand.push(initialCards[1].card1);
    dealerHand.push(initialCards[1].card2);
}

initializeGame();