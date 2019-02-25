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
  searchDataFromDb = (page) => {
    console.log("searchDataFromDb",this.state);
    axios.post("/api/searchData", {search : {}, number : this.state.numberAds , page:page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {
      return (
        <Display searchDataFromDb={(page) => this.state.searchDataFromDb(page)} numberAds={this.state.numberAds} date={this.state.data}/>
      )
   }
}
