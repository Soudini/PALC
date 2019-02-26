import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {
    
  }




  render () {
      return (
        <Display search={{ "$or":[{"type":{"$regex": search, "$options" : "i"}},{"author":{"$regex": search, "$options" : "i"}},{"reward":{"$regex": search, "$options" : "i"}},{"description":{"$regex": search, "$options" : "i"}},{"title":{"$regex": search, "$options" : "i"}} ]}}/>
      )
   }
}
