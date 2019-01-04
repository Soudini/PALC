import React, { Component } from 'react';
import axios from "axios";
import Ad from "../components/ad.js";

export default class Found extends Component {
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

  keepSearch(data) {
    if (data.type === 'found') return(<Ad data={data}/>)
  }

  render () {




      return (
        <div className="row flex-wrap d-flex align-self-stretch">
          {this.state.data.map(this.keepSearch)}
        </div>
      )
   }
}
