import React from 'react';
import '../styles.css';
import FadeIn from 'react-fade-in';

const Card = (props) => {
  return(

    <td>
      <FadeIn>
        <div className={props.color}>
          {props.value}{props.suit}
        </div>
      </FadeIn>
    </td>

  )
}

export default Card;
