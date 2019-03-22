import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default class Home extends Component {

  render () {
      return (
          <Display search = {{author_login: cookies.get("login")}}/>
        )
   }
}
