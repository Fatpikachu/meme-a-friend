import React from 'react';

const NextButton = ({nxtPage}) => {
  return (
    <button className='next-button' onClick={nxtPage}>
      Next &gt;
    </button>
  )
}

export default NextButton;