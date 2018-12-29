import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main.js';
import Banner from './components/banner.js';
class App extends Component {
  render() {
    return (
        <div>
          <Banner />
          <Main />
        </div>
    );
  }
}

export default App;
