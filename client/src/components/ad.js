import React, { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import axios from "axios";
import "./ad.css";
import Cookies from 'universal-cookie';

let cookies = new Cookies(); //initialize cookies



export class Page extends Component { // full page view of the ad with the id written in the URI


  state = {
    data:null,
  }

  componentDidMount () {
    this.searchDataFromDb(); // get ads to display
  }

  handleDelete = () => { // delete the ad

      if (window.confirm("Voulez vous vraiment supprimer cette annonce ?"))
      {
        axios.post("/api/deleteData", {id :this.props.match.params.id, auth : cookies.get("auth")}); // auth to check whether it is the true author or not (or an admin)
        this.props.history.push("/");
      }

  }

  handleUpdate =()=> { // redirect to the page to update the ad

      this.props.history.push("/updatePost/"+ this.props.match.params.id);

  }

  searchDataFromDb = () => { // gather data from the DB

    axios.post("/api/searchById", {id :this.props.match.params.id, auth : cookies.get("auth")})
      .then(data => {return(data.data)})
      .then(res => {this.setState({show_button:res.show_button}); this.setState({ data: res.data })}); // data : content of ads, show_button : whether to show update and delete buttons
  };
  render() {
    let buttonDelete = null;
    let buttonUpdate = null;

    if (this.state.data && this.state.show_button) { // if we have some data and have to show the button
      buttonDelete = <button className="btn btn-danger col"  onClick={this.handleDelete}>Supprimer l'annonce </button>;
      buttonUpdate = <button className="btn btn-primary col" style={{"marginRight": "1rem","marginLeft": "1rem"}}onClick={this.handleUpdate}>Modifier l'annonce</button>;

    }

    if(this.state.data) { //if we have data

      let carousel = null;

      if ((this.state.data.thumbnail != null & this.state.data.thumbnail != "") | this.state.data.image.length) { //if there is a thumbnail or images to show create the carousel
        carousel = <div id="carouselExampleControls" className="carousel slide col" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div><div className="row justify-content-center" style={{"height" : "300px"}}><img className="img-fluid img-test" src={this.state.data.thumbnail} alt="thumbnail"/></div></div>

              </div>
              {this.state.data.image.map((img) =><div key={img.slice(img.length-20,img.length-1)} className="carousel-item">
                <div><div className="row justify-content-center" style={{"height" : "300px"}}><img className="img-fluid img-test" src={img} alt="images"/></div></div>
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
            <a className="col" href={"https://linkcs.fr/user/"+this.state.data.author_login}><button className="btn btn-secondary w-100 h-100"  > LinkCS </button></a>
            {buttonUpdate}
            {buttonDelete}
          </div>
        </div>
      </div>

    </div>)}
    else {return (<div/>)}
  }
}


export default class Ad extends Component { // card for the mutliple ads view
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      value: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  printTitle = () => { //cut the title if too long

    if (this.props.data.title && this.props.data.title.length > 120){
      return (this.props.data.title.slice(0,100) + " ...");
    }
    else {
      return (this.props.data.title);
    }

  }

  printDescription = () => { // cut the description if too long

    if (this.props.data.description && this.props.data.description.length > 200){
      return (this.props.data.description.slice(0,150) + " ...");
    }
    else {
      return (this.props.data.description);
    }

  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateParent("title", event.target.value);
  }

  render() {
    let className = "card h-100"//+ (this.props.data.type === "search" ? " bg-secondary" : " bg-success");
    return (<a className="style-1" href="#" style={{"marginTop":"1rem" , "marginLeft" : "auto", "marginRight" : "auto", "marginBottom": "1rem"}}>
              <div className={className} style={{"width": "18rem"}} >
                <LinkContainer to={"/ad/"+this.props.data._id}>
                  <img className="card-img-top test" style={{"maxHeight" : "1px"}} src={this.props.data.thumbnail} />
                </LinkContainer>
                <LinkContainer to={"/ad/"+this.props.data._id}>
                <div className="card-body ">
                  <h5 className="card-title">{this.printTitle()}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{this.props.data.author + (this.props.data.reward ? " offre "+ this.props.data.reward: "")}</h6>
                  <p className="card-text">{this.printDescription()}</p>
                </div>
                </LinkContainer>
              </div>
            </a>
    )
  }
}
