import React, { Component } from 'react';
import Comments from './CommentSection';

class Display extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: '',
    }
    this.myRef = React.createRef()
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
    this.myRef.current.scrollTo(0, 0);
  }



  render(){
    let url = this.props.dataObj.link.replace('gifv', 'mp4');
    return(
      <React.Fragment>
        <div className='display-container' ref={this.myRef}>
          <h3>
            {this.props.dataObj.title}
          </h3>
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
          <p className='description'>{
          this.props.dataObj.description
          ? this.props.dataObj.description
          : ''
          }</p>
          </div>
      <Comments commentsArr={this.state.comments}/>
      </React.Fragment>
    )
  }
}

export default Display