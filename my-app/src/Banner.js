import React, { Component } from 'react';
import './Banner.css';
class Banner extends Component{
  render(){
    return(
      <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Objets-Trouvés</a>


        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Annonces Recherche <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Annonces Trouvaille</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="post.html">Poster une annonce</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Mon compte</a>
            </li>

          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher une annonce</button>
          </form>
        </div>
      </nav>
    )
  }

}

export default Banner;
