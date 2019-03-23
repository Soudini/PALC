import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import "./home.css";
import logopalccouleur from "../files/logopalccouleur.png";

export default class All extends Component {

  render() {
    return (
      <section>
        <div className="container-fondus ">
          <div className="row">
            <div className="col-lg-7 mx-auto text-center">

              <br></br>
              <h1 class="section-heading"> Bienvenue sur PALC ! </h1>
              <hr class="light my-4" />
              <img src={logopalccouleur} class="img-fluid" alt="Responsive image" />
              <p> Mais qu'est ce que PALC peut bien vouloir dire ?  Ca veut dire "Pinte à la clé" ! Tu peux trouver ici les objets trouvés, ou faire une annonce si tu as trouvé un objet.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
