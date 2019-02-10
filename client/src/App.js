import React, { Component } from 'react';
import './App.css';
import Main from './components/main.js';
import Banner from './components/banner.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const date = new Date();

class App extends Component {

  componentDidMount = () => {
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
