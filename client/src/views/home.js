import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";

export default class Home extends Component {
  state = {
    data: [],
    numberAds : 0,
    page:0
  }

  componentDidMount() {
    this.searchDataFromDb(0);
    this.getNumberAds();
  }


  getNumberAds = () => {
    axios.post("/api/getNumberAds",{search : {}})
      .then(data => data.data).then(res => {this.setState({ numberAds: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (page, numberAdsToGet) => {
    axios.post("/api/searchData", {search : {}, numberAdsToGet : numberAdsToGet , page:page })
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {
      return (
        <Display searchDataFromDb={(page, numberAdsToGet) => this.searchDataFromDb(page, numberAdsToGet)} numberAds={this.state.numberAds} data={this.state.data}/>
      )
   }
}
