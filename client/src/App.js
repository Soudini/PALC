import React, { Component } from 'react';
import './App.css';
import Main from './components/main.js';
import Banner from './components/banner.js';
import Cookies from 'universal-cookie';
import { loadReCaptcha } from 'recaptcha-v3-react';

const cookies = new Cookies();

const date = new Date();

class App extends Component {

  componentDidMount = () => {
    loadReCaptcha({key : "6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR", id : "reCaptcha"}).then(id => {
        console.log('ReCaptcha loaded', id)
      });
    cookies.set("lastAuthTry", date.getTime())
  }

  render() {

    return (
        <div className="container-fluid">
          <Banner/>
          <br></br><br></br><br></br><br></br>
          <Main />
        </div>
    );
  }
}

export default App;
