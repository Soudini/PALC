import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
export default class All extends Component {
  render(){
    return(
      <div id="root">
    <div class="app-loading">
      <img id="icon_spinner" src="./logopalc.png"/>
      <svg class="spinner" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
      </svg>
    </div>
  </div>
    )
  }
  
  render () {
      return (
        
        <Display search = {{}}/>)
   }
}
