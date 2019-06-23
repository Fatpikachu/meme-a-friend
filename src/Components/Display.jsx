import React, { Component } from 'react';
import { IMGUR_ID } from '../config';
import { fetchComments } from '../Handlers/comments';
import Comments from './CommentSection';

class Display extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: '',
    }
  }

  componentDidMount(){
    fetchComments(this.props.dataObj.id)
    .then((res) => {
      let comments = res.data;
      console.log('the comments', comments)
      this.setState({ comments });
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props === nextProps;
  // }

  // componentWillReceiveProps({nextProps}) {
  //   if (this.props !== nextProps) {
  //     fetchComments(this.props.dataObj.id);
  //   }
  // }

  componentWillUpdate({nextProps}) {
    console.log("DOING THIS")
    fetchComments(this.props.dataObj.id)
    .then((res) => {
    let comments = res.data;
    this.setState({ comments });
    });
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
