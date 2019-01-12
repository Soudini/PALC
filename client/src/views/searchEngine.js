import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";

export default class Perso extends Component {
  state = {
    data: null,
    search : this.props.match.params.searchText,
  }

  componentDidMount = () => {
  this.searchDataFromDb(this.props.match.params.searchText);
  }


  searchDataFromDb = (searchText) => {
    axios.post("/api/searchData", {search : { "$or":[{"type":{"$regex": searchText}},{"author":{"$regex": searchText}},{"reward":{"$regex": searchText}},{"description":{"$regex": searchText}} ]}})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {
      if (this.state.search !== this.props.match.params.searchText){
        this.state.search = this.props.match.params.searchText;
        this.searchDataFromDb(this.props.match.params.searchText);

      }
      return (
        <div className="card-group">
            {this.state.data ? this.state.data.map(dat => (<div className="col-sm d-flex"><Ad data={dat}/></div>)): "Aucune donnée trouvée"}
        </div>
      )
   }
}
