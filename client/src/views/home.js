import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
export default class All extends Component {

  render () {
      return (
        <div className="container-fluid">
          <h1>Bienvenue sur Palc ! </h1>
          <p> Mais qu'est ce que palc peut bien vouloir dire ?  Ca veut dire "Pinte à la clé"</p>
        </div>
      )
   }
}
