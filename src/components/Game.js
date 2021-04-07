import React, {useState, useEffect} from 'react';
import '../styles.css';
import Card from './Card';



const Game = () => {

  const [deck, setDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [houseCards, setHouseCards] = useState([]);

  const [playerValue, setPlayerValue] = useState(0);
  const [houseValue, setHouseValue] = useState(0);

  const [gameCondition, setGameCondition] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const newGame = () => {
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

        tempDeck.push(card)
      }
    }

    //Knuth Shuffle
    let currentIndex = tempDeck.length;
    let tempValue;
    let randomIndex;

    while(0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = tempDeck[currentIndex];
      tempDeck[currentIndex] = tempDeck[randomIndex];
      tempDeck[randomIndex] = tempValue;
    }

    setDeck([...tempDeck])

    tempPlayerCards.push(tempDeck.pop());
    tempHouseCards.push(tempDeck.pop());
    tempPlayerCards.push(tempDeck.pop());

    setDeck([...tempDeck]);
    setPlayerCards([...tempPlayerCards]);
    setHouseCards([...tempHouseCards]);

  }

  const calcTotal = () => {
    let tempHouseCards = houseCards;
    let tempPlayerCards = playerCards;
    let tempPlayerValue = 0;
    let tempHouseValue = 0;

    for (let card of tempPlayerCards) {
      if (card.cardValue === 'A' && tempPlayerValue > 10) {
        card.cardWeight = 1
      }

      tempPlayerValue += card.cardWeight

    }

    for (let card of tempHouseCards) {
      if (card.cardValue === 'A' && tempHouseValue > 10) {
        card.cardWeight = 1
      }
      tempHouseValue += card.cardWeight
    }

    setPlayerValue(tempPlayerValue)
    setHouseValue(tempHouseValue)
  }

  const hit = () => {
    if (!gameOver) {
      let tempDeck = deck;
      let tempPlayerCards = playerCards;
      let tempPlayerValue = playerValue;

      let nextCard = tempDeck.pop()

      for (let card of tempPlayerCards) {
        if (card.cardValue === 'A') {
          if (nextCard.cardWeight + tempPlayerValue > 21) {
            card.cardWeight = 1
          }
        }
      }

      tempPlayerCards.push(nextCard);

      setDeck([...tempDeck])
      setPlayerCards([...tempPlayerCards])
    } else {
      return
    }


  }

  const stand = () => {
    if (!gameOver) {
      let tempDeck = deck;
      let tempHouseCards = houseCards;
      let tempHouseValue = houseValue;


      while(tempHouseValue <= 17) {
        let endDeck = tempDeck.pop();
        if (endDeck.cardValue === 'A' && tempHouseValue > 10) {
          endDeck.cardWeight = 1;
        }
        tempHouseValue += endDeck.cardWeight;
        tempHouseCards.push(endDeck);
      }



      setDeck([...tempDeck])
      setHouseCards([...tempHouseCards])
      setHouseValue(tempHouseValue)

    } else {
      return
    }

  }


  const checkWin = () => {

    if (playerValue > 21) {
      setGameCondition('Player bust!, you lose!')
      setGameOver(true)
    } else if (houseValue > 21) {
      setGameCondition('House bust!, you win!')
      setGameOver(true)
    } else if (playerValue > houseValue && houseCards.length > 1) {
      setGameCondition('You win!')
      setGameOver(true)
    } else if (houseValue > playerValue && houseCards.length > 1) {
      setGameCondition('You lose!')
      setGameOver(true)
    } else if (playerValue === houseValue && houseCards.length > 1) {
      setGameCondition('Push!')
      setGameOver(true)
    } else {
      setGameCondition('')
      setGameOver(false)
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
        <button onClick={() => window.location.reload()}>new game</button>
        <button onClick={() => hit()}>hit</button>
        <button onClick={() => stand()}>stand</button>
      </div>


      <p>{gameCondition}</p>
      <p>your cards: ({playerValue.toString()})</p>
      <table className="cards">
        <tbody>
          <tr>
            {
              playerCards.map((card, i) => {
                return <Card key={i} value={card.cardValue} suit={card.cardSuit} color={card.cardColor} />
              })
            }
          </tr>
        </tbody>
      </table>

      <p>house cards: ({houseValue.toString()})</p>
      <table className="cards">
        <tbody>
          <tr>
            {
              houseCards.map((card, i) => {
                return <Card key={i} value={card.cardValue} suit={card.cardSuit} color={card.cardColor} />
              })
            }
          </tr>
        </tbody>
      </table>

    </div>
  )

}

export default Game;
