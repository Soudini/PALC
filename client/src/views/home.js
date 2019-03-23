import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import "./home.css";
import logopalccouleur from "../files/logopalccouleur.png";

export default class All extends Component {

  render() {
    return (
      <section className="bg-primary">
        <div className="container-fluid text-center">
          <br></br>
          <h1>Bienvenue sur Palc ! </h1>
          <img src={logopalccouleur} class="img-fluid" alt="Responsive image" />
          <p> Mais qu'est ce que palc peut bien vouloir dire ?  Ca veut dire "Pinte à la clé"</p>
        </div>
      </section>
    )
  }
}
