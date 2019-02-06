import React, { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';

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
      {axios.post("/api/deleteData", {id :this.props.match.params.id, auth : cookies.get("auth")});
        this.props.history.push("/");}
  }
  handleUpdate =()=> {

      this.props.history.push("/updatePost/"+ this.props.match.params.id);

  }

  searchDataFromDb = () => {
    console.log(cookies.get("auth"));
    axios.post("/api/searchById", {id :this.props.match.params.id, auth : cookies.get("auth")})
      .then(data => {console.log(data); return(data.data)}).then(res => {console.log(res.show_button);this.setState({show_button:res.show_button});this.setState({ data: res.data })});
  };
  render() {
    let buttonDelete = null;
    let buttonUpdate = null;
    console.log(this.state.data);
    if (this.state.data && this.state.show_button) {
      buttonDelete = <button className="btn btn-danger col"  onClick={this.handleDelete}>Supprimer l'annonce </button>;
      buttonUpdate = <button className="btn btn-primary col" style={{"marginRight": "1rem","marginLeft": "1rem"}}onClick={this.handleUpdate}>Modifier l'annonce</button>;

    }
    if(this.state.data) {

      let carousel = null;

      if (this.state.data.thumbnail != null | this.state.data.image.length) {
        carousel = <div id="carouselExampleControls" className="carousel slide col" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div><div className="row justify-content-center" style={{"height" : "300px"}}><img className="img-fluid img-test" src={this.state.data.thumbnail} alt="Second slide"/></div></div>

              </div>
              {this.state.data.image.map((img) =><div key={img.slice(img.length-20,img.length-1)} className="carousel-item">
                <div><div className="row justify-content-center" style={{"height" : "300px"}}><img className="img-fluid img-test" src={img} alt="Second slide"/></div></div>
              </div>)}
              </div>
              <a className="carousel-control-prev " style={{"color": "red"}} href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
          </div>;
      }

    return (
    <div className="jumbotron fluid">
      <div className="container">
        <h1 className="display-4">{this.state.data.title}</h1>
      </div>
      <br/>
      <div className="row align-items-center">
        {carousel}
        <div className="col-sm-6">
          <h5>{"Cette annonce a été créée par "+this.state.data.author}</h5>
          <p>{this.state.data.description}</p>
          <div className="row">
            {buttonUpdate}
            {buttonDelete}
          </div>
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

  printTitle = () => {
    if (this.props.data.title && this.props.data.title.length > 120){
      return (this.props.data.title.slice(0,100) + " ...");
    }
    else {
      return (this.props.data.title)
    }
  }

  printDescription = () => {
    if (this.props.data.description && this.props.data.description.length > 200){
      return (this.props.data.description.slice(0,150) + " ...");
    }
    else {
      return (this.props.data.description)
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value})
    this.props.updateParent("title", event.target.value)
  }

  render() {
    let className = "card h-100"//+ (this.props.data.type === "search" ? " bg-secondary" : " bg-success");
    return (<a className="style-1" href="#" style={{"marginTop":"1rem" , "marginLeft" : "auto", "marginRight" : "auto"}}>
              <div className={className} style={{"width": "18rem"}} >
                <LinkContainer to={"/ad/"+this.props.data._id}>
                  <img className="card-img-top test" style={{"maxHeight" : "1px"}} src={this.props.data.thumbnail} />
                </LinkContainer>
                <LinkContainer to={"/ad/"+this.props.data._id}>
                <div className="card-body ">
                  <h5 className="card-title">{this.props.data.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{this.props.data.author + (this.props.data.reward ? " offre "+ this.props.data.reward: "")}</h6>
                  <p className="card-text">{this.printDescription()}</p>
                  </div>
                </LinkContainer>
              </div>
            </a>
    )
  }
}
