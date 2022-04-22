import React, {ReactDOM, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NextButton from './Components/NextButton';
import PreviousButton from './Components/PrevButton';
import Display from './Components/Display';
import { FORMERR } from 'dns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPooStorm} from '@fortawesome/free-solid-svg-icons';
// import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: '',
      currIndx: 0,
      currData: '',
      allData: '',
      recipient: '',
      topStrip: false,
    }
    this.paginateRef = React.createRef()
    this.appContainer = React.createRef()
  }

  listenScrollEvent = e => {
    if (window.scrollY > 110) {
      this.setState({topStrip: true})
    } else {
      this.setState({topStrip: false})
    }
  }
  
  componentDidMount(){
    window.addEventListener('scroll', this.listenScrollEvent)
  }


  componentWillMount() {
    fetch('https://meme-a-friend-server.herokuapp.com/gallery')
      .then( result => {
        return result.json()
      }).then( res => {
        this.setState({allData: res.data, currData: res.data[0]})
      })
  }

  componentDidUpdate(){
    // console.log('the app container updated')
  }

  sendText(){
    const { recipient, currData } = this.state;
    fetch(`https://meme-a-friend-server.herokuapp.com/send-text?recipient=${recipient}&textMsg=${currData.link}`)
      .then((response) => {
        if(response.status === 200){
        window.alert('WOW! you actually sent something to a friend, Thanks for trying it out!')
        } else {
          window.alert('Invalid phone number');
        }
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
    window.scrollTo(0, 115);
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
    window.scrollTo(0, 115);
  }
  

  render() {
    let loading = <div className='display-container'>Loading ...</div>
    const { text } = this.state
    return (
      <React.Fragment>
      <div className='app-container' ref={this.appContainer}>
          <div className='header'>
            <FontAwesomeIcon className='icon' icon={faPooStorm} />
            <i class="fas fa-poo-storm"></i>
            <div className='title-first-letter'>M</div>
            <div className='title'> eme-a-friend </div>
          </div>
        <div className={'paginate ' + (this.state.topStrip ? 'top-strip' : null)} ref={this.paginateRef}>
          <PreviousButton prevPage={this.prevPage.bind(this)} />
          <NextButton nxtPage={this.nxtPage.bind(this)}/>
        </div>
        <div className='send-to'>
            <input placeholder={'Enter phone number'}
            ref='inputField'
              onChange={(e)=>{ this.setState({recipient: e.target.value})} }/>
            
            <button className='send' onClick={this.sendText.bind(this)}>Send To Friend</button>
        </div>
        {
        this.state.currData ? <Display dataObj={this.state.currData} /> : loading
        }
        {/* <p className='description'>{
          this.state.currData
          ? this.state.currData.description
          : ''
          }</p> */}
      </div>
      </React.Fragment>
    );
  }
}


export default App;