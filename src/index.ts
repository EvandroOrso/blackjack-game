import PromptSync from "prompt-sync";
const prompt = PromptSync();
import deck from "./deck";
import player from "./player";
import { shuffleDeck, getInitialCards, getHandTotal } from "./utils";

// Data
let isGameRunning = false;
let playerHand: string[] = [];
let dealerHand: string[] = [];
let playerTotal = 0;
let dealerTotal = 0;
let cardIndex = 4; // Index of the next card to draw (starts at 4 because 4 cards are drawn at the start)

// Initialize game
function initializeGame() {
    isGameRunning = true;

    // Ask the player to place a bet
    console.log(`Player's funds: $${player.balance}`);
    let bet = Number(prompt(`Enter your bet: $`));
    while(bet > player.balance || isNaN(bet) || bet === 0) {
        bet = Number(prompt(`Please insert a valid value: $`));
    }
    
    // Shuffle deck and get initial cards
    const shuffledDeck = shuffleDeck(deck);
    let initialCards = getInitialCards(shuffledDeck);

    // Deal initial cards
    playerHand.push(initialCards[0].card1);
    playerHand.push(initialCards[0].card2);
    dealerHand.push(initialCards[1].card1);
    dealerHand.push(initialCards[1].card2);

    // Calculate totals for player and dealer
    playerTotal = getHandTotal(playerHand);
    dealerTotal = getHandTotal(dealerHand);

    // Shows hands
    if(playerTotal === 21) {
        console.log(`Your hand: ${playerHand.join(", ")} (Blackjack!)`);
        console.log(`Dealer's hand: ${dealerHand[0]}, [hidden]`);
        console.log(`You win $${bet}! (3:2 payout for Blackjack)`);
        player.balance += bet * 1.5;
        console.log(`Player's funds: $${player.balance}`);
        return;
    } else if(dealerTotal === 21) {
        console.log(`Your hand: ${playerHand.join(", ")} (Total: ${playerTotal})`);
        console.log(`Dealer's hand: ${dealerHand[0]}, [hidden]`);
        console.log(`Dealer reveals: ${dealerHand.join(", ")} (Blackjack!)`);
        console.log(`Dealer has Blackjack. You lose ${bet}`);
        player.balance -= bet;
        console.log(`Player's funds: $${player.balance}`);
        return;
    } else {
        console.log(`Your hand: ${playerHand.join(", ")} (Total: ${playerTotal})`);
        console.log(`Dealer's hand: ${dealerHand[0]}, [hidden]`);
    }

    // Player action
    do {
        let action = prompt("Your action (hit/stand): ");
        if(action.toLowerCase().trim() === "hit") {
            playerHand.push(shuffledDeck[cardIndex]); // Draw a new card
            cardIndex++;
            playerTotal = getHandTotal(playerHand);

            if(playerTotal > 21) {
                console.log(`Your hand: ${playerHand.join(", ")} (Total: ${playerTotal} - Bust!)`);
                console.log(`Dealer's hand: ${dealerHand.join(", ")} (Total: ${dealerTotal})`);
                console.log(`You bust and lose $${bet}`);
                player.balance -= bet;
                console.log(`Player's funds: $${player.balance}`);
                return;
            }

            console.log(`Your hand: ${playerHand.join(", ")} (Total: ${playerTotal})`);
            if(!isGameRunning) return; // Leaves while loop
        } else if(action.toLowerCase().trim() === "stand") {
            console.log(`Dealer's hand: ${dealerHand.join(", ")} (Total: ${dealerTotal})`);

            if(dealerTotal < 17) {
                dealerHand.push(shuffledDeck[cardIndex]); // Draw a new card
                cardIndex++;
                dealerTotal = getHandTotal(dealerHand);

                if(dealerTotal > 21) {
                    console.log(`Dealer hits: ${dealerHand.join(", ")} (Total: ${dealerTotal} - Dealer Busts!)`);
                    console.log(`You win $${bet}`);
                    player.balance += bet;
                    console.log(`Player's funds: $${player.balance}`);
                    return;
                } else {
                    console.log(`Dealer hits: ${dealerHand.join(", ")} (Total: ${dealerTotal})`);
                }
            }

            if(playerTotal > dealerTotal) {
                console.log(`You win $${bet}!`);
                player.balance += bet;
                console.log(`Player's funds: $${player.balance}`);
            } else if(playerTotal === dealerTotal) {
                console.log(`It's a push! Your bet is returned.`);
            } else {
                console.log(`Dealer wins. You lose $${bet}!`);
                player.balance -= bet;
                console.log(`Player's funds: $${player.balance}`);
            }
            
            return;
        }
    } while(true);
}

initializeGame();