import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";

export default class Home extends Component {
  state = {
    data: [],
    number : 16,
    page:0
  }

  componentDidMount() {
    this.searchDataFromDb();
    this.getNumberAds();
  }


  getNumberAds = () => {
    axios.post("/api/getNumberAds",{search : {type: "search"}})
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (page) => {
    console.log("searchDataFromDb",this.state);
    axios.post("/api/searchData", {search : {type: "search"}, number : this.state.number , page: page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };


  render () {
      return (
        <Display searchDataFromDb={(page) => this.searchDataFromDb(page)} numberAds={this.state.numberAds} data={this.state.data}/>
      )
   }
}
