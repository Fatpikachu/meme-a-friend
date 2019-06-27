import React from 'react';

const PrevButton = ({prevPage}) => {
  return (
    <button className='prev-button' onClick={prevPage}>
      &lt; Prev
    </button>
  )
}

export default PrevButton;