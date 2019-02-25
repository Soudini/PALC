import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {
    data: null,
    number : 16,
    page:0
  }

  componentDidMount = () => {
    this.searchDataFromDb(this.props.match.params.search);

    this.getNumberAds(this.props.match.params.search);
  }


  getNumberAds = (search) => {
    axios.post("/api/getNumberAds",{search : { "$or":[{"type":{"$regex": search, "$options" : "i"}},{"author":{"$regex": search, "$options" : "i"}},{"reward":{"$regex": search, "$options" : "i"}},{"description":{"$regex": search, "$options" : "i"}},{"title":{"$regex": search, "$options" : "i"}} ]}})
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (search) => { // search in every fields without caring for case
      axios.post("/api/searchData", {search : { "$or":[{"type":{"$regex": search, "$options" : "i"}},{"author":{"$regex": search, "$options" : "i"}},{"reward":{"$regex": search, "$options" : "i"}},{"description":{"$regex": search, "$options" : "i"}},{"title":{"$regex": search, "$options" : "i"}} ]},number : this.state.number , page:this.state.page})
        .then(data => data.data).then(res => {this.setState({ data: res.data })});
  };



  render () {
      return (
        <Display searchDataFromDb={(page) => this.searchDataFromDb(this.props.match.params.page)} numberAds={this.state.numberAds} data={this.state.data}/>
      )
   }
}
