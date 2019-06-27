import React, {Component} from 'react';


const CommentSection = ({commentsArr}) => {
  return (
    commentsArr   
    ? <div className='comment-container'>
      {
        commentsArr.map((comment) => {
          if(comment.comment.match(/\.(jpeg|jpg|gif|png)$/)){
            return (
              <div className='comment'>  
                <img className='comment-gifs' src={comment.comment} />
              </div>)
          } else {
            return (
              <div className='comment'>  
                {comment.comment}
              </div>)
          }
        })
      }
    </div>
    : <div className='comment-container'>Looooading...</div>
  )
}

export default CommentSection;