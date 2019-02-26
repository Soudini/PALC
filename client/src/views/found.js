import React, { Component } from 'react';
import Display from "../components/display.js";

export default class Home extends Component {

  render () {
      return (
        <Display search = {{type: "found"}}/>
      )
   }
}
