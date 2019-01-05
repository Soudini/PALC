import React, { Component } from 'react';
import './body.css'

class Body extends Component{
  render() {
    return (<div className="container-fluid container-red">
          <div className="row">
              <div className="col-lg test">
                test1
              </div>
              <div className="col-sm test">
                test2
              </div>
              <div className="col-sm test">
                test3 Ceci est un autre test
              </div>
          </div></div>)
  }
}

export default Body;
