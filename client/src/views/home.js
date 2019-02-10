import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";

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

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  }

  getNumberAds = () => {
    axios.post("/api/getNumberAds",{search : {}})
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = () => {
    console.log("searchDataFromDb",this.state);
    axios.post("/api/searchData", {search : {}, number : this.state.number , page:this.state.page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  changePage = (i) => {
    this.state.page = i ;
    this.searchDataFromDb();
    console.log("this.state.page", this.state.page);
  }

  previousNext = (i) => {
    this.state.page = this.state.page + i ;
    if (this.state.page < 0) {
      this.state.page = 0;
    };
    if (this.state.page > this.state.pageNumber / this.state.number) {
      this.state.page = Math.floor(this.state.pageNumber / this.state.number);
    };
    this.searchDataFromDb();
  }

  render () {

      let pagination = [];
      for (let i = 0; i<this.state.pageNumber / this.state.number; i++){
        pagination.push(i)
      }
      console.log("render",this.state);
      return (
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
      )
   }
}
