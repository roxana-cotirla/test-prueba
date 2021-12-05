// CARD GAME TEST
/*
Write a program that runs rounds of poker and determines which hand is the winning hand.
Details:
The number of players must be able to be variable.
The solution should cover one of the poker variants (such as classic 5-card stud) but should be extensible to texas hold-em and Omaha hi/lo in the future.
The execution of the hand should only cover the dealing of cards and the resolution of the winning hand. There is no player interaction and therefore no betting or accounting. I must be able to play several rounds without restarting the program.
The language is irrelevant (but preferable in Python or Javascript) 
*/

// ROXANA COTIRLA 

class Card {
    constructor(card) {
        this.card = card;
        const cardValeus = {
"ace of hearts":1,
"two of hearts":2,
"three of hearts":3,
"four of hearts":4,
"five of hearts":5,
"six of hearts":6,
"seven of hearts":7,
"eight of hearts":8,
"nine of hearts":9,
"ten of hearts":10,
"jack of hearts":11,
"queen of hearts":12,
"king of hearts":13,

"ace of diamonds":1,
"two of diamonds":2,
"three of diamonds":3,
"four of diamonds":4,
"five of diamonds":5,
"six of diamonds":6,
"seven of diamonds":7,
"eight of diamonds":8,
"nine of diamonds":9,
"ten of diamonds":10,
"jack of diamonds":11,
"queen of diamnods":12,
"king of diamnods":13,

"ace of clubs":1,
"two of clubs":2,
"three of clubs":3,
"four of clubs":4,
"five of clubs":5,
"six of clubs":6,
"seven of clubs":7,
"eight of clubs":8,
"nine of clubs":9,
"ten of clubs":10,
"jack of clubs":11,
"queen of clubs":12,
"king of clubs":13,

"ace of spades":1,
"two of spades":2,
"three of spades":3,
"four of spades":4,
"five of spades":5,
"six of spades":6,
"seven of spades":7,
"eight of spades":8,
"nine of spades":9,
"ten of spades":10,
"jack of spades":11,
"queen of spades":12,
"king of spades":13
}      
        this.value = cardValues[card];
        this.suit = card.substring(card.indexOf(" of ")+4);
        this.placeHolder = null;
        this.flipped = false;
        var suits = {'hearts':0, 'diamonds':13, 'clubs':26, 'spades':39 }
        this.position = suits[this.suit] + this.value;  //location in deck
    } 
    
    displayCard(placeHolder,flipped=true) { //show cards
      this.placeHolder = document.getElementById(placeHolder);
      this.placeHolder.classList.add("card");
      this.flipped=flipped;
      if (flipped) {
        this.placeHolder.style.backgroundPosition = -150*this.position + "px";
      } else {
        this.placeHolder.style.backgroundPosition = "0px";  
      }
    }
    
    flip() {
      if (this.flipped) {
        this.placeHolder.style.backgroundPosition = "0px";
        this.flipped=false;
      } else {
        this.placeHolder.style.backgroundPosition = -150*this.position + "px";
        this.flipped=true;  
      }
    } 
  } 



// =============================================================================

class Deck {
    constructor() {
    this.deck = [];
    this.reset(); //new game = new 52 cards
    this.shuffle(); //mix the cards before dealing
  } 
  
  reset() {  //assign 52 cards to the deck
    this.deck = [];
    const suits = ['heart', 'diamond', 'club', 'spade'];
    const values = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    //add into the deck array each possible value for each possible suite
    for (let suit in suits) {   
      for (let value in values) {
        this.deck.push(values[value]  + suits[suit]);
      }
    }
  } 
  
  shuffle() {  //mix all cards randomly
    let lengthDeck = this.deck.length;  
    for (var i=0; i<lengthDeck; i++) {
      let k = Math.floor(Math.random() * lengthDeck); //random position in deck 
      let currentCard = this.deck[i];  //current card
      this.deck[i] = this.deck[k];
      this.deck[k] = currentCard;
    }
  } 

  length() {  
    return this.deck.length;
  } 
  deal(){  //deal the cards
    return this.deck.pop();
  } 
  isEmpty() {  //empty deck - all cards are dealt
    return (this.deck.length==0);
  } 
  
} 


// =============================================================================

const deck = new Deck(); //one poker deck
let card1,card2,card3,card4,card5; //5 cards poker game
let players = [];  //players array

//deal the first round
function deal() {
  if (deck.length()<7) {
    deck.reset(); //reset the deck
    deck.shuffle(); //shuffle the cards before dealing
  }  
 //assign 5 cards as it is a 5 card game
  card1 = new Card(deck.deal()); 
  card2 = new Card(deck.deal());
  card3 = new Card(deck.deal());
  card4 = new Card(deck.deal());
  card5 = new Card(deck.deal());
  //assign cards to each player
  for (let i = 0; i < players.length; i++) {
      players[i]=new Card(deck.deal());
   
  }  
  
  //display the cards 
  card1.displayCard("card1",false);  
  card2.displayCard("card2",false);  
  card3.displayCard("card3",false);  
  card4.displayCard("card4",false);  
  card5.displayCard("card5",false);  

  for (let i = 0; i < players.length; i++) {
    players[i].displayCard("player",true);
 
}  

} 
 
function nextStep(element) {
    //5 cards poker rule - order of displaying the cards
  if (!card1.flipped) {
    card1.flip();
    card2.flip();
    card3.flip();
    element.innerHTML="display 4th card";
  } else if(!card4.flipped) {
    card4.flip();
    element.innerHTML="display 5th card";
} else if(!card5.flipped) {
    card5.flip();
    element.innerHTML="NEW ROUND";
} else {
  deal();
  element.innerHTML="display cards 1,2,3";
}
}
 
deal();
