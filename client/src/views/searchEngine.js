import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default class Perso extends Component {
  state = {
    data: null,
    search : this.props.match.params.searchText,
    number : 16,
    page:0
  }

  componentDidMount = () => {
    this.searchDataFromDb(this.props.match.params.searchText);

    this.getNumberAds(this.props.match.params.searchText);
  }


  getNumberAds = (searchText) => {
    axios.post("/api/getNumberAds",{search : { "$or":[{"type":{"$regex": searchText, "$options" : "i"}},{"author":{"$regex": searchText, "$options" : "i"}},{"reward":{"$regex": searchText, "$options" : "i"}},{"description":{"$regex": searchText, "$options" : "i"}},{"title":{"$regex": searchText, "$options" : "i"}} ]}})
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = (searchText) => {
      axios.post("/api/searchData", {search : { "$or":[{"type":{"$regex": searchText, "$options" : "i"}},{"author":{"$regex": searchText, "$options" : "i"}},{"reward":{"$regex": searchText, "$options" : "i"}},{"description":{"$regex": searchText, "$options" : "i"}},{"title":{"$regex": searchText, "$options" : "i"}} ]}})
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
      if (this.state.search !== this.props.match.params.searchText){
        this.state.search = this.props.match.params.searchText;
        this.searchDataFromDb(this.props.match.params.searchText);

      }
      let pagination = [];
      for (let i = 0; i<this.state.pageNumber / this.state.number; i++){
        pagination.push(i)
      }
      return (
        <div className="row justify-content-center">
          <div className="card-deck">
              {this.state.data ? this.state.data.map(dat => (<div className="col-sm d-flex"><Ad data={dat}/></div>)): "Aucune donnée trouvée"}
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
