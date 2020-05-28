import React, {Component} from 'react';


class CommentSection extends Component{
    constructor(props){
      super(props);
      this.state = {
        comments: '',
      }
      this.myRef = React.createRef()
    }

    componentDidUpdate(){
      this.myRef.current.scrollTo(0, 0);
    }

  render(){
    let { commentsArr } = this.props
    return (
      commentsArr   
      ? <div className='comment-container' ref={this.myRef}>
          <div className='comment-title'>Top Comments:</div>
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
}

export default CommentSection