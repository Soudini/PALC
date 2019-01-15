import React, { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';

import { withRouter} from 'react-router-dom';
import axios from "axios";
import "./ad.css";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export class Page extends Component {


  state = {
    data:null,
  }

  componentDidMount () {
    this.searchDataFromDb();
  }

  handleDelete =()=> {

      if (window.confirm("Voulez vous vraiment supprimer cette annonce ?"))
      {axios.post("/api/deleteData", {id :this.props.match.params.id });
    this.props.history.push("/");}



  }

  searchDataFromDb = () => {
    axios.post("/api/searchById", {id :this.props.match.params.id })
      .then(data => data.data).then(res => {this.setState({ data: res.data })});
  };
  render() {
    let button = null;
    if (this.state.data && this.state.data.author_id == cookies.get("id")) {
      console.log(this.state.data.author_id , cookies.get("id"))
      button = <button className="btn btn-danger" onClick={this.handleDelete}>Supprimer l'annonce </button>;
    }
    if(this.state.data) {return (
    <div className="jumbotron jumbotron fluid">
      <div className="container">
        <h1 className="display-4">{this.state.data.title}</h1>
      </div>
      <br/>
      <div className="row align-items-center">
        <div id="carouselExampleControls" className="carousel slide col-sm row align-items-center" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={this.state.data.thumbnail} alt="First slide"/>
            </div>
              {this.state.data.image.map((img) =><div className="carousel-item">
                <img className="d-block w-100 img-fluid" src={img} alt="Second slide"/>
              </div>)}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
        </div>
        <div className="col-sm">
          <h5>{"Cette annonce a été créée par "+this.state.data.author}</h5>
          <p>{this.state.data.description}</p>
          {button}
        </div>
      </div>

    </div>)}
    else {return (<div/>)}
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
    return (<a className="style-1" href="#">
              <div className={className} style={{"marginTop": "20px", "width": "18rem"}}>
                <LinkContainer to={"/ad/"+this.props.data._id}>
                  <img className="card-img-top" src={this.props.data.thumbnail} />
                </LinkContainer>
                <LinkContainer to={"/ad/"+this.props.data._id}>
                <div className="card-body ">
                  <h5 className="card-title">{this.props.data.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{this.props.data.author + (this.props.data.reward ? " offre "+ this.props.data.reward: "")}</h6>
                  <p className="card-text">{this.props.data.description}</p>
                  </div>
                </LinkContainer>
              </div>
            </a>
    )
  }
}
