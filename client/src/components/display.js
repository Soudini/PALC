import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./display.css";
import Ad from "./ad.js";
import axios from "axios";
import logopalc from "../files/logopalc.png"
import "./display.css";
import AuncunResultat from "../files/AucunResultat.png";

class Display extends Component {
  //props : search = dictionary defining the appropriate search for the db (cf different pages in views/)
  state = {
    page: 0,
    adsDisplayed: 16,
    numberAds: 0,
    data: []
  }

  componentDidMount() {
    this.setState({ data: this.searchDataFromDb(this.props.search, this.state.page, this.state.adsDisplayed) });
    this.setState({ searchedfor: this.props.search })
    this.setState({ numberAds: this.getNumberAds(this.props.search) });
  }

  changePage = (i) => { //change page to page number i
    this.state.page = i;
    this.searchDataFromDb(this.props.search, this.state.page, this.state.adsDisplayed);
  }

  previousNext = (i) => { // change page to the next or previous
    this.state.page = this.state.page + i;
    if (this.state.page < 0) {
      this.state.page = 0;
    };
    if (this.state.page > this.state.numberAds / this.state.adsDisplayed) {
      this.state.page = Math.floor(this.state.numberAds / this.state.adsDisplayed);
    };
    this.searchDataFromDb(this.props.search, this.state.page, this.state.adsDisplayed);
  }

  getNumberAds = (search) => {
    axios.post("/api/getNumberAds", { search: search })
      .then(data => data.data).then(res => { this.setState({ numberAds: res.data }) });

  }
  searchDataFromDb = (search, page, numberAdsToGet) => { // 
    axios.post("/api/searchData", { search: search, numberAdsToGet: numberAdsToGet, page: page })
      .then(data => data.data).then(res => { this.setState({ data: res.data }) });
  };

  render() {
    if (this.state.data == "") {
      return (
        <section>
          <div className="container-fondus ">
            <div className="row">
              <div className="col-lg-6 mx-auto text-center">

                <br></br>
                <img src={AuncunResultat} id="noresults_image" class="img-fluid" alt="Responsive image" />
              </div>
            </div>
          </div>
        </section>
      )
    }
    if (this.state.numberAds != 0) {
      if (this.props.search != this.state.searchedfor) {
        this.setState({ data: this.searchDataFromDb(this.props.search, this.state.page, this.state.adsDisplayed) });
        this.setState({ searchedfor: this.props.search });
        console.log("researching", this.props.search);
      }
      let pagination = [];
      for (let i = 0; i < this.state.numberAds / this.state.adsDisplayed; i++) {
        pagination.push(i)
      }
      if (this.state.data) {
        return (
          <div>
            <div className="row justify-content-center">
              <div className="card-deck">
                {this.state.data.map(dat => (<Ad key={dat._id} data={dat} />))}
              </div>
            </div>
            <nav className="row justify-content-center" aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#" onClick={() => this.previousNext(-1)}>Prev</a></li>
                {pagination.map(i => (<li className={"page-item" + (this.state.page == i ? " active" : " ")} key={i}><a key={i} className="page-link" href="#" onClick={() => this.changePage(i)}>{i + 1}</a></li>))}
                <li className="page-item"><a className="page-link" href="#" onClick={() => this.previousNext(1)}>Next</a></li>
              </ul>
            </nav>
          </div>
        )
      }
      else {
        return (
          <div className="app-loading">
            <img id="icon_spinner" src={logopalc} />
            <svg className="spinner" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
            </svg>
          </div>
        )
      }
    }
  }
}


export default withRouter(Display);