import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
  this.searchDataFromDb(cookies.get("id"));
  }


  searchDataFromDb = (searchText) => {
    axios.post("/api/searchData", {search : {author_id: searchText}})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {
      return (
        <div>
          <div>
            <h3>Mes annonces</h3>
          </div>
            <div className="card-deck">
                {this.state.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
            </div>
        </div>
      )
   }
}
