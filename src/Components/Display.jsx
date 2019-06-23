import React, { Component } from 'react';
import { IMGUR_ID } from '../config';
import Comments from './CommentSection';

class Display extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: '',
    }
  }

  componentDidMount(){
    this.fetchComments(this.props.dataObj.id);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props === nextProps;
  // }

  fetchComments = (id) => {
    fetch(` https://api.imgur.com/3/gallery/${id}/comments/best`, {
      headers: {
        "Authorization": 'Client-ID ' + IMGUR_ID,
      }
    })
    .then((comments) => {
      return comments.json();
    })
    .then((res) => {
      console.log('fetched comments from imgur: ', res)
      this.setState({comments: res.data})
    })
  }

  fetchComments = (id) =>
    new Promise(function(resolve, reject) {
    fetch(`https://api.imgur.com/3/gallery/${id}/comments/best`,
    {
    "headers": {
    "Authorization": 'Client-ID ' + IMGUR_ID,
    }
    }
    )
    .then(comments => {
    return comments.json()
    })
    .then((comments) => {
      console.log('fetched comments from imgur: ', comments.data)
      this.setState({comments: comments.data}, ()=>{
        resolve(comments);
      })
    })
    .catch((err) => {
    console.error(err);
    });
    });
  
  componentWillReceiveProps({nextProps}) {
    if (this.props !== nextProps) {
      this.fetchComments(this.props.dataObj.id);
    }
  }



  render(){
    console.log('the dataOBJ:  ', this.props.dataObj)
    let url = this.props.dataObj.link.replace('gifv', 'mp4');
    return(
      <React.Fragment>
      <div>
        <h1>
          {this.props.dataObj.title}
        </h1>
        {
          this.props.dataObj.images
          ? this.props.dataObj.images.map((item) => {
            let url = item.link.replace('gifv', 'mp4')
            return(
              <div>
                {
                url.slice(-3) === 'mp4' 
                ? <video src={url} width='500px' type="video/mp4" autoPlay loop controls/>
                : <img src={url} width='500px' />
                }
                <p>{item.description}</p>
              </div>
            )
          })
          :
            <div>
              {
              url.slice(-3) === 'mp4' 
              ? <video src={url} width='500px' type="video/mp4" autoPlay loop controls/>
              : <img src={url} width='500px' />
              }
            </div>
        }
      </div>
      <Comments commentsArr={this.state.comments}/>
      </React.Fragment>
    )
  }
}

export default Display