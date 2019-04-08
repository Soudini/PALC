import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import Cookies from 'universal-cookie';
import AuncunResultat from "../files/AucunResultat.png";

let cookies = new Cookies();

export default class Perso extends Component {
  state = {}




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
        <Display search={{ "$or": [{ "type": { "$regex": this.props.match.params.searchText, "$options": "i" } }, { "author": { "$regex": this.props.match.params.searchText, "$options": "i" } }, { "reward": { "$regex": this.props.match.params.searchText, "$options": "i" } }, { "description": { "$regex": this.props.match.params.searchText, "$options": "i" } }, { "title": { "$regex": this.props.match.params.searchText, "$options": "i" } }] }} />
      )
    }
  }
}
