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

  console.log("test");
  this.searchDataFromDb(cookies.get("id"));
  }


  searchDataFromDb = (searchText) => {
    console.log(searchText);
    axios.post("/api/searchData", {search : {author_id: searchText}})
      .then(data => data.data).then(res => {console.log(res.data);this.setState({ data: res.data })});

  };

  render () {
      if (this.state.data){return (
        <div>
          <div>
            <h3>Mes annonces</h3>
          </div>
          <div className="row justify-content-center">
            <div className="card-deck">
                {this.state.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
            </div>
          </div>
        </div>
      )}
      else{
        return (<div></div>)}
   }
}
