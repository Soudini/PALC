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
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });

    }
    this.getNumberAds(cookies.get("login"));
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getNumberAds = (searchText) => {
    axios.post("/api/getNumberAds",{search : {author_login: searchText}})
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (searchText) => {
    console.log("searchDataFromDb",this.state);
    axios.post("/api/searchData", {search : {author_login: searchText}, number : this.state.number , page:this.state.page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  changePage = (i) => {
    this.state.page = i ;
    this.searchDataFromDb(cookies.get("login"));
    console.log("this.state.page", this.state.page);
  }

  previousNext = (i) => {
    this.state.page = this.state.page + i ;
    this.searchDataFromDb(cookies.get("login"));
  }

  render () {

      let pagination = [];
      for (let i = 0; i<this.state.pageNumber / this.state.number; i++){
        pagination.push(i)
      }
      console.log("render",this.state);
      return (
        <div>
          <div>
            <h3>Mes annonces</h3>
          </div>
          <div className="row justify-content-center">
            <div className="card-deck">
                {this.state.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" onClick={() => this.previousNext(-1)}>Previous</a></li>
                {pagination.map( i => (<li class="page-item"><a class="page-link" href="#" onClick={() => this.changePage(i)}>{i+1}</a></li>))}
                <li class="page-item"><a class="page-link" href="#" onClick={() => this.previousNext(1)}>Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      )
   }
}
