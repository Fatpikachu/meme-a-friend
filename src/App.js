import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { IMGUR_ID } from './config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: '',
      currIndx: 0,
      currData: '',
      allData: '',
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
      this.setState({allData: res.data})
    })
  }

  

  render() {
    let title = ''
    this.state.allData[0] ? title = this.state.allData[0].title : title = 'nothinggg'
    return (
      <div className="">
        {title}
      </div>
    );
  }
}


export default App;
