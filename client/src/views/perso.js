import React, { Component } from 'react';
import axios from "axios";
import Display from "../components/display.js";
import Cookies from "universal-cookie"

let cookies = new Cookies();
export default class Home extends Component {
  state = {
    data: [],
    numberAds : 0,
  }

  componentDidMount() {
    this.searchDataFromDb(cookies.get("login"));
    this.getNumberAds(cookies.get("login"));
  }

  getNumberAds = (search) => {
    axios.post("/api/getNumberAds",{search : {author_login: search}})
      .then(data => data.data).then(res => {this.setState({ numberAds: res.data })});

  }
  searchDataFromDb = (search,page, numberAdsToGet) => {
    axios.post("/api/searchData", {search : {author_login: search}, numberAdsToGet :numberAdsToGet, page: page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {
      return (
        <Display searchDataFromDb={(page, numberAdsToGet) => this.searchDataFromDb(cookies.get("login"),page, numberAdsToGet)} numberAds={this.state.numberAds} data={this.state.data}/>
      )
   }
}
