import React, { Component } from 'react';
import Ad from "./ad.js";

export default class Display extends Component {
  //props : numberAds = number of Ads in total, data = Ads data , searchDataFromDb = function to get Ads from db with the page number as argument
  state = {
    page:0,
    adsDisplayed : 16
  }

  changePage = (i) => {
    this.state.page = i ;
    this.props.searchDataFromDb(this.state.page, this.state.adsDisplayed);
    console.log("this.state.page", this.state.page);
  }

  previousNext = (i) => {
    this.state.page = this.state.page + i ;
    if (this.state.page < 0) {
      this.state.page = 0;
    };
    if (this.state.page > this.props.numberAds / this.state.adsDisplayed) {
      this.state.page = Math.floor(this.props.numberAds / this.state.adsDisplayed);
    };
    this.props.searchDataFromDb(this.state.page,  this.state.adsDisplayed);
  }

  render () {

      let pagination = [];
      for (let i = 0; i<this.props.numberAds / this.state.adsDisplayed; i++){
        pagination.push(i)
      }
      console.log("render",this.props);
      if (this.props.data){
      return (
          <div>
            <div className="row justify-content-center">
              <div className="card-deck">
                  {this.props.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
              </div>              
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
    else {
      return (<div/>)
    }
   }
}
