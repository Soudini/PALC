import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {
    data: null,
    numberAds : 0,
  }

  componentDidMount = () => {
    this.searchDataFromDb(this.props.match.params.search);

    this.getNumberAds(this.props.match.params.search);
  }


  getNumberAds = (search) => {
    axios.post("/api/getNumberAds",{search : { "$or":[{"type":{"$regex": search, "$options" : "i"}},{"author":{"$regex": search, "$options" : "i"}},{"reward":{"$regex": search, "$options" : "i"}},{"description":{"$regex": search, "$options" : "i"}},{"title":{"$regex": search, "$options" : "i"}} ]}})
      .then(data => data.data).then(res => {this.setState({ numberAds: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (search, page, numberAdsToGet) => { // search in every fields without caring for case
      axios.post("/api/searchData", {search : { "$or":[{"type":{"$regex": search, "$options" : "i"}},{"author":{"$regex": search, "$options" : "i"}},{"reward":{"$regex": search, "$options" : "i"}},{"description":{"$regex": search, "$options" : "i"}},{"title":{"$regex": search, "$options" : "i"}} ]},numberAdsToGet : numberAdsToGet, page: page})
        .then(data => data.data).then(res => {this.setState({ data: res.data })});
  };



  render () {
      return (
        <Display searchDataFromDb={(page, numberAdsToGet) => this.searchDataFromDb(this.props.match.params.search, page , numberAdsToGet)} numberAds={this.state.numberAds} data={this.state.data}/>
      )
   }
}
