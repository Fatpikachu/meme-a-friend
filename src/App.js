import React, {ReactDOM, Component} from 'react';
import logo from './logo.svg';
import './App.css';
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
    fetch('https://hidden-gorge-50503.herokuapp.com/gallery')
      .then( result => {
        return result.json()
      }).then( res => {
        this.setState({allData: res.data, currData: res.data[0]})
      })
  }


  sendText(){
    const { recipient, currData } = this.state;
    fetch(`https://hidden-gorge-50503.herokuapp.com/send-text?recipient=${recipient}&textMsg=${currData.link}`)
      .then((response) => {
        response.json()
      // ).then((msg)=>{
      //   console.log('sent successfuly to recipient: ', msg)
      //   window.alert('imgur link has been sent!')
      // })
      // .catch((err) => {
      //   window.alert(err)
      // })
      })
    this.refs.inputField.value = '';
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
        <div className='title-first-letter'>M</div>
      <div className='title'> eme-a-friend </div>
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