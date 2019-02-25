import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";
import Cookies from "universal-cookie"

let cookies = new Cookies();
export default class Home extends Component {
  state = {
    data: [],
    number : 16,
    page:0
  }

  componentDidMount() {
    this.searchDataFromDb(cookies.get("login"));
    this.getNumberAds(cookies.get("login"));
  }

  getNumberAds = (search) => {
    axios.post("/api/getNumberAds",{search : {author_login: search}})
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (search,page) => {
    console.log("searchDataFromDb",this.state);
    axios.post("/api/searchData", {search : {author_login: search}, number : this.state.number , page: page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {
      return (
        <Display searchDataFromDb={(page) => this.searchDataFromDb(cookies.get("login"),page)} numberAds={this.state.numberAds} data={this.state.data}/>
      )
   }
}
