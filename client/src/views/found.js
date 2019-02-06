import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";

export default class Found extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.searchDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }


  searchDataFromDb = () => {
    axios.post("/api/searchData", {search : {"type": "found"}})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  };

  render () {




    return (
        <div className="row justify-content-center">
          <div className="card-deck">
              {this.state.data.map(dat => (<Ad key={dat._id} data={dat}/>))}
          </div>
        </div>
    )
   }
}
