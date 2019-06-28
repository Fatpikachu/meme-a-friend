import React, { Component } from 'react';
import Comments from './CommentSection';

class Display extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: '',
    }
  }

  componentDidMount(){
    fetch(`https://hidden-gorge-50503.herokuapp.com/comments?id=${this.props.dataObj.id}`)
      .then((response) => 
        response.json()
      ).then((comments) => {
        this.setState({ comments: comments.data });
      });
  };


  componentDidUpdate(prevProps) {
    if (this.props !== prevProps){
      fetch(`https://hidden-gorge-50503.herokuapp.com/comments?id=${this.props.dataObj.id}`)
      .then((response) => 
        response.json()
      ).then((comments) => {
        this.setState({ comments: comments.data });
      });
    }
  }



  render(){
    let url = this.props.dataObj.link.replace('gifv', 'mp4');
    return(
      <React.Fragment>
        <h3>
          {this.props.dataObj.title}
        </h3>
      <div className='display-container'>
        <div className='images-container'>
        {
          this.props.dataObj.images
          ? this.props.dataObj.images.map((item) => {
            let url = item.link.replace('gifv', 'mp4')
            return(
              <div className='display-item'>
                {
                url.slice(-3) === 'mp4'
                ? <video src={url} width='550px' type="video/mp4" autoPlay loop controls/>
                : <img src={url} width='550px' />
                }
                <p>{item.description}</p>
              </div>
            )
          })
          :
            <div className='display-item'>
              {
              url.slice(-3) === 'mp4'
              ? <video src={url} width='550px' type="video/mp4" autoPlay loop controls/>
              : <img src={url} width='550px' />
              }
            </div>
          }
          </div>
          <div className='comment-title'>Top Comments:</div>
      <Comments commentsArr={this.state.comments}/>
      </div>
      </React.Fragment>
    )
  }
}

export default Display