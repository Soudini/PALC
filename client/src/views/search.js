import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import AuncunResultat from "../files/AucunResultat.png";

export default class Home extends Component {


  render() {
    return (
      <Display search={{ type: "search" }} />
    )
  }
}
