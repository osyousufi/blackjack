import React from 'react';
import '../styles.css';
import Card from './Card';
import FadeIn from 'react-fade-in';


const Table = (props) => {

  return (
    <>
      <FadeIn>
        <p>{props.tableName} cards: {props.totalValue}</p>
      </FadeIn>
      <table className="cards">
        <tbody>
          <tr>
            {
              props.cards.map((card, i) => {
                return(
                  props.addDelay === true ? <Card key={i} value={card.cardValue} suit={card.cardSuit} color={card.cardColor} index={i} /> : <Card key={i} value={card.cardValue} suit={card.cardSuit} color={card.cardColor} index={0} />
                )
              })
            }
          </tr>
        </tbody>
      </table>
    </>
  );

}

export default Table;
