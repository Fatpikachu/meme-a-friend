import React, {ReactDOM, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { IMGUR_ID } from './config';
import NextButton from './Components/NextButton';
import PreviousButton from './Components/PrevButton';
import Display from './Components/Display';
import { FORMERR } from 'dns';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: '',
      currIndx: 0,
      currData: '',
      allData: '',
      recipient: '',
    }
  }

  componentWillMount() {
    fetch(`https://api.imgur.com/3/gallery/hot/time/1?showViral=showViral=true&mature=true&album_previews=false`, {
      headers: {
        "Authorization": 'Client-ID ' + IMGUR_ID,
      }
    })
    .then((imgData) => {
      return imgData.json();
    })
    .then((res) => {
      this.setState({allData: res.data, currData: res.data[0]})
    })
  }


  sendText(){
    const { recipient, currData } = this.state;
    fetch(`http://localhost:3008/send-text?recipient=${recipient}&textMsg=${currData.link}`)
      .then(()=>{
        this.refs.inputField.value = '';
        window.alert('imgur link has been sent!')
      })
      .catch((err) => {
        window.alert(err)
        console.error(err)
      })
  }

  prevPage(){
    let indx = this.state.currIndx - 1;
    if(indx >= 0){
      this.setState((state) => {
        return {
          currIndx: indx,
          currData: state.allData[indx]
        }
      });
    }
  }

  nxtPage() {
    let indx = this.state.currIndx + 1;
    if(indx <= 410){
      this.setState((state) => {
        return {
          currIndx: indx,
          currData: state.allData[indx]
        }
      });
    }
  }
  

  render() {
    let loading = <div className='display-container'>Loading ...</div>
    const { text } = this.state
    return (
      <React.Fragment>
      <div className='title'> Meme-A-Friend </div>
      <div className='container'>
      <div className='buttons-container'>
        <PreviousButton prevPage={this.prevPage.bind(this)} />
        <NextButton nxtPage={this.nxtPage.bind(this)}/>
        
          <input placeholder={'Enter phone number'}
           ref='inputField'
            onChange={(e)=>{ this.setState({recipient: e.target.value})} }/>
          <button onClick={this.sendText.bind(this)}>Send To Friend</button>
        
      </div>
      {
      this.state.currData ? <Display dataObj={this.state.currData} /> : loading
      }
      <p className='description'>{this.state.currData.description}</p>
      </div>
      </React.Fragment>
    );
  }
}


export default App;