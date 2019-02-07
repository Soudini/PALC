import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";

export default class Home extends Component {
  state = {
    data: [],
    number : 12,
    page:0
  }

  componentDidMount() {
    this.searchDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });

    }
    this.getNumberAds();
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getNumberAds = () => {
    axios.post("/api/getNumberAds")
      .then(data => data.data).then(res => {this.setState({ pageNumber: res.data }, console.log("number of ads",res.data))});

  }
  searchDataFromDb = () => {
    console.log(this.state);
    axios.post("/api/searchData", {search : {}, number : this.state.number , page:this.state.page})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  changePage = (i) => {
    this.setState({page : i},console.log("test",this.state.page,i))
    this.searchDataFromDb();
    console.log("this.state.page", this.state.page);
  }
  render () {

      let pagination = [];
      for (let i = 0; i<this.state.pageNumber / 10; i++){
        pagination.push(i)
      }
      console.log(this.state);
      return (
          <div className="row justify-content-center">
            <div className="card-deck">
                {this.state.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                {pagination.map( i => (<li class="page-item"><a class="page-link" href="" onClick={() => this.changePage(i)}>{i+1}</a></li>))}
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
      )
   }
}
