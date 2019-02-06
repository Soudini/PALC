import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {
    data: null,
    search : this.props.match.params.searchText,
  }

  componentDidMount = () => {
  this.searchDataFromDb(this.props.match.params.searchText);
  }


  searchDataFromDb = (searchText) => {
    console.log(searchText);
    if (searchText == ""){
      this.props.history.push("/");
    }
    else {
      axios.post("/api/searchData", {search : { "$or":[{"type":{"$regex": searchText, "$options" : "i"}},{"author":{"$regex": searchText, "$options" : "i"}},{"reward":{"$regex": searchText, "$options" : "i"}},{"description":{"$regex": searchText, "$options" : "i"}},{"title":{"$regex": searchText, "$options" : "i"}} ]}})
        .then(data => data.data).then(res => {this.setState({ data: res.data })});
      }

  };

  render () {
      if (this.state.search !== this.props.match.params.searchText){
        this.state.search = this.props.match.params.searchText;
        this.searchDataFromDb(this.props.match.params.searchText);

      }
      return (
        <div className="row justify-content-center">
        <div className="card-group">
            {this.state.data ? this.state.data.map(dat => (<div className="col-sm d-flex"><Ad data={dat}/></div>)): "Aucune donnée trouvée"}
        </div>
        </div>
      )
   }
}
