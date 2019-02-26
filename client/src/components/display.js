import React, { Component } from 'react';
import Ad from "./ad.js";

export default class Display extends Component {
  //props : numberAds = number of Ads in total, data = Ads data , searchDataFromDb = function to get Ads from db with the page number as argument
  state = {
    page:0,
    adsDisplayed : 16,
    numberAds :0,
    data: []
  }

  componentDidMount () {
    this.setState({data: this.searchDataFromDb(this.props.search, this.state.page, this.state.adsDisplayed)});
    this.setState({numberAds : this.getNumberAds(this.props.search)});
  }

  changePage = (i) => {
    this.state.page = i ;
    this.searchDataFromDb(this.props.search, this.state.page, this.state.adsDisplayed);
  }

  previousNext = (i) => {
    this.state.page = this.state.page + i ;
    if (this.state.page < 0) {
      this.state.page = 0;
    };
    if (this.state.page > this.state.numberAds / this.state.adsDisplayed) {
      this.state.page = Math.floor(this.state.numberAds / this.state.adsDisplayed);
    };
    this.searchDataFromDb(this.props.search, this.state.page,  this.state.adsDisplayed);
  }

  getNumberAds = (search) => {
    axios.post("/api/getNumberAds",{search :  search})
      .then(data => data.data).then(res => {this.setState({ numberAds: res.data })});

  }
  searchDataFromDb = (search, page, numberAdsToGet) => { // search in every fields without caring for case
      axios.post("/api/searchData", {search : search,numberAdsToGet : numberAdsToGet, page: page})
        .then(data => data.data).then(res => {this.setState({ data: res.data })});
  };

  render () {
      console.log(this.props)
      let pagination = [];
      for (let i = 0; i<this.state.numberAds / this.state.adsDisplayed; i++){
        pagination.push(i)
      }
      if (this.state.data){
      return (
          <div>
            <div className="row justify-content-center">
              <div className="card-deck">
                  {this.state.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
              </div>
            </div>
              <nav className="row justify-content-center" aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#" onClick={() => this.previousNext(-1)}>Previous</a></li>
                  {pagination.map( i => (<li className={"page-item" + (this.state.page == i ? " active" : " ")} key={i}><a key={i} className="page-link" href="#" onClick={() => this.changePage(i)}>{i+1}</a></li>))}
                  <li className="page-item"><a className="page-link" href="#" onClick={() => this.previousNext(1)}>Next</a></li>
                </ul>
              </nav>
          </div>
      )
    }
    else {
      return (<div/>)
    }
   }
}
