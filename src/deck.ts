const suits = ["♦", "♠", "♥", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K"];

const deck = suits.flatMap(suit => values.map(value => value + suit));

export default deck;