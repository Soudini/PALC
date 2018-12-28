import React, { Component } from 'react';
import logo from './logo.svg';
import './Body.css'

class Body extends Component{
  render() {
    return (<div class="container-fluid container-red">
          <div class="row">
              <div class="col-lg test">
                test1
              </div>
              <div class="col-sm test">
                test2
              </div>
              <div class="col-sm test">
                test3 Ceci est un autre test
              </div>
          </div></div>)
  }
}

export default Body;
