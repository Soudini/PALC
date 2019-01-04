import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";

export default class Home extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.getDataFromDb();
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


  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => {this.setState({ data: res.data })});

  };


  render () {




      return (
          <div className="card-group">
              {this.state.data.map(dat => (<div className="col-sm d-flex"><Ad data={dat}/></div>))}
          </div>
      )
   }
}
