import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import AuncunResultat from "../files/AucunResultat.png";

export default class Home extends Component {


  render() {
    if (this.props.match.params.searchText === "") {
      return (
        <section>
          <div className="container-fondus ">
            <div className="row">
              <div className="col-lg-6 mx-auto text-center">

                <br></br>
                <img src={AuncunResultat} id="noresults_image" class="img-fluid" alt="Responsive image" />
              </div>
            </div>
          </div>
        </section>
      )
    }
    else {
      return (
        <Display search={{ type: "search" }} />
      )
    }
  }
}
