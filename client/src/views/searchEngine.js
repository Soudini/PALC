import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {}




  render () {
      return (
        <Display search={{ "$or":[{"type":{"$regex": this.props.params.match.search, "$options" : "i"}},{"author":{"$regex": this.props.params.match.search, "$options" : "i"}},{"reward":{"$regex": this.props.params.match.search, "$options" : "i"}},{"description":{"$regex": this.props.params.match.search, "$options" : "i"}},{"title":{"$regex": this.props.params.match.search, "$options" : "i"}} ]}}/>
      )
   }
}
