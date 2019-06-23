import React, {Component} from 'react';


class CommentSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: '',
    }
  }

  //  shouldComponentUpdate(nextProps, nextState) {
  //   return this.props !== nextProps;
  // }

  render(){
    return (
      this.props.commentsArr   
      ? <div className='comment-container'>
        {
          this.props.commentsArr.map((comment) => {
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
      : <div>Looooading...</div>
    )
    }
}

export default CommentSection;