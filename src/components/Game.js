import React, {useState, useEffect} from 'react';
import '../styles.css';
import Table from './Table';


const Game = () => {

  const [deck, setDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [houseCards, setHouseCards] = useState([]);

  const [playerValue, setPlayerValue] = useState(0);
  const [houseValue, setHouseValue] = useState(0);

  const [gameCondition, setGameCondition] = useState('');
  const [gameOver, setGameOver] = useState(false);

  //Knuth Shuffle
  const shuffleDeck = (deckToShuffle) => {
    let currentIndex = deckToShuffle.length;
    let tempValue;
    let randomIndex;

    while(0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = deckToShuffle[currentIndex];
      deckToShuffle[currentIndex] = deckToShuffle[randomIndex];
      deckToShuffle[randomIndex] = tempValue;
    }

    setDeck([...deckToShuffle]);
  }

  const newGame = () => {
    //generate 52 deck
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let weight;
    let color;
    let tempDeck = [];
    let tempPlayerCards = [];
    let tempHouseCards = [];

    for (let suit of suits) {
      for (let value of values) {

        if (value === 'J' || value === 'Q' || value === 'K') {
          weight = 10;
        } else if (value === 'A') {
          weight = 11;
        } else {
          weight = parseInt(value);
        }

        if (suit === '♥' || suit === '♦') {
          color = "card-red"
        } else {
          color = "card-black"
        }

        let card = {
          cardValue: value,
          cardSuit: suit,
          cardWeight: weight,
          cardColor: color,
        }

        tempDeck.push(card);
      }
    }


    shuffleDeck(tempDeck);

    //dealing cards
    tempPlayerCards.push(tempDeck.pop());
    tempHouseCards.push(tempDeck.pop());
    tempPlayerCards.push(tempDeck.pop());
    setDeck([...tempDeck]);
    setPlayerCards([...tempPlayerCards]);
    setHouseCards([...tempHouseCards]);

  }

  const checkAce = (cards, value) => {

    for (let card of cards) {
      if (card.cardValue === 'A' && value > 10) {
        card.cardWeight = 1;
      }
      value += card.cardWeight;
    }
    return value;

  }

  const calcTotal = () => {

    let tempHouseCards = houseCards;
    let tempPlayerCards = playerCards;
    let tempPlayerValue = 0;
    let tempHouseValue = 0;

    setPlayerValue(checkAce(tempPlayerCards, tempPlayerValue));
    setHouseValue(checkAce(tempHouseCards, tempHouseValue));

  }

  const hit = () => {

    if (!gameOver) {
      let tempDeck = deck;
      let tempPlayerCards = playerCards;
      let tempPlayerValue = playerValue;

      let nextCard = tempDeck.pop();


      for (let card of tempPlayerCards) {
        if (card.cardValue === 'A') {
          if (nextCard.cardWeight + tempPlayerValue > 21) {
            card.cardWeight = 1;
          }
        }
      }

      tempPlayerCards.push(nextCard);

      setDeck([...tempDeck]);
      setPlayerCards([...tempPlayerCards]);

    } else {
      return;
    }

  }

  const stand = () => {

    if (!gameOver) {
      let tempDeck = deck;
      let tempHouseCards = houseCards;
      let tempHouseValue = houseValue;


      while (tempHouseValue <= 17) {

        let endDeck = tempDeck.pop();
        if (endDeck.cardValue === 'A' && tempHouseValue > 10) {
          endDeck.cardWeight = 1;
        }

        tempHouseValue += endDeck.cardWeight;
        tempHouseCards.push(endDeck);

      }

      setDeck([...tempDeck]);
      setHouseCards([...tempHouseCards]);
      setHouseValue(tempHouseValue);

    } else {
      return;
    }

  }


  const checkWin = () => {

    if (playerValue > 21) {
      setGameCondition('Player bust, you lose!');
      setGameOver(true);
    } else if (houseValue > 21) {
      setGameCondition('House bust, you win!');
      setGameOver(true);
    } else if (playerValue > houseValue && houseCards.length > 1) {
      setGameCondition('You win!');
      setGameOver(true);
    } else if (houseValue > playerValue && houseCards.length > 1) {
      setGameCondition('You lose!');
      setGameOver(true);
    } else if (playerValue === houseValue && houseCards.length > 1) {
      setGameCondition('Push!');
      setGameOver(true);
    } else {
      setGameCondition('');
      setGameOver(false);
    }

  }


  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    calcTotal();
    checkWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div className="main">

      <h1><span>Black</span><span id="title-jack">jack</span></h1>
      <div>
        <button type="button" className="btn" onClick={() => window.location.reload()}>new game</button>
        <button type="button" className="btn" onClick={() => hit()}>hit</button>
        <button type="button" className="btn" onClick={() => stand()}>stand</button>
      </div>


      <p>{gameCondition}</p>

      <Table tableName="Your" totalValue={playerValue.toString()} cards={playerCards} addDelay={false} />
      <Table tableName="House" totalValue={houseValue.toString()} cards={houseCards} addDelay={true}  />

    </div>
  );

}

export default Game;
