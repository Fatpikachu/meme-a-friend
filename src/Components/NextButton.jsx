import React from 'react';

const NextButton = ({nxtPage}) => {
  return (
    <button className='next-button' onClick={nxtPage}>
      &gt;
    </button>
  )
}

export default NextButton;