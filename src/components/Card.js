import React from 'react';
import '../styles.css';

const Card = (props) => {
  return(
    <td>
      <div className={props.color}>
        {props.value}{props.suit}
      </div>
    </td>
  )
}

export default Card;
