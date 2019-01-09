import React, { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import axios from "axios";
export class Page extends Component {


  state = {
    data:null,
  }
  componentDidMount () {
    this.searchDataFromDb();
  }

  searchDataFromDb = () => {
    axios.post("/api/searchData", {search : {"_id": this.props.match.params.id}})
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

    console.log(this.state.data);

  };
  render() {
    return (<div>{this.props.match.params.id}</div>
    )
  }
}

export default class Ad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      value: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    this.props.updateParent("title", event.target.value)
  }

  render() {
    let className = "card center"//+ (this.props.data.type === "search" ? " bg-secondary" : " bg-success");
    return (<div className={className} style={{"marginTop": "20px", "width": "18rem"}}>
                <img className="card-img-top" src={this.props.data.image} />
                <LinkContainer to={"/ad/"+this.props.data._id}>
                <div className="card-body ">
                  <h5 className="card-title">{this.props.data.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{this.props.data.author + (this.props.data.reward ? " offre "+ this.props.data.reward: "")}</h6>
                  <p className="card-text">{this.props.data.description}</p>
                  </div>
                </LinkContainer>
              </div>
    )
  }
}
