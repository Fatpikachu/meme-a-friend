import React from 'react';

const PrevButton = ({prevPage}) => {
  return (
    <button className='prev-button' onClick={prevPage}>
      &lt;
    </button>
  )
}

export default PrevButton;