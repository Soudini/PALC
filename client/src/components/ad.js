import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import axios from "axios";
import "./ad.css";
import Cookies from 'universal-cookie';
import image from "../files/defaultphoto.png"

let cookies = new Cookies(); //initialize cookies



export class Page extends Component { // full page view of the ad with the id written in the URI


  state = {
    data: null,
  }

  componentDidMount() {
    this.searchDataFromDb(); // get ads to display
  }

  handleDelete = () => { // delete the ad

    if (window.confirm("Voulez vous vraiment supprimer cette annonce ?")) {
      axios.post("/api/deleteData", { id: this.props.match.params.id, auth: cookies.get("auth") }); // auth to check whether it is the true author or not (or an admin)
      this.props.history.push("/");
    }

  }

  handleUpdate = () => { // redirect to the page to update the ad

    this.props.history.push("/updatePost/" + this.props.match.params.id);

  }

  searchDataFromDb = () => { // gather data from the DB

    axios.post("/api/searchById", { id: this.props.match.params.id, auth: cookies.get("auth") })
      .then(data => { return (data.data) })
      .then(res => { this.setState({ show_button: res.show_button }); this.setState({ data: res.data }) }); // data : content of ads, show_button : whether to show update and delete buttons
  };
  render() {
    let buttonDelete = null;
    let buttonUpdate = null;



    if (this.state.data && this.state.show_button) { // if we have some data and have to show the button
      buttonDelete = <button className="btn btn-danger col" onClick={this.handleDelete} style={{ "border-radius": "50px", "padding": "10px" }}><i class="fa fa-trash" style={{ "color": "white", "margin-right": "4px" }}></i>Delete</button>;
      buttonUpdate = <button className="btn btn-primary col" style={{ "marginRight": "1rem", "marginLeft": "1rem", "border-radius": "50px", "padding": "10px" }} onClick={this.handleUpdate}><i class='fa fa-edit' style={{ "color": "white", "margin-right": "4px" }}></i>Edit</button>;

    }

    if (this.state.data) { //if we have data

      let carousel = null;

      if (this.state.data.thumbnail === "") {
        this.state.data.thumbnail = image
      }
      if (this.state.data.thumbnail === null) {
        this.state.data.thumbnail = image
      }

      if ((this.state.data.thumbnail != null & this.state.data.thumbnail != "") | this.state.data.image.length) { //if there is a thumbnail or images to show create the carousel
        carousel = <div id="carouselExampleControls" className="carousel slide col" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div><div className="row justify-content-center" style={{ "height": "300px" }}><img className="img-fluid img-test" src={this.state.data.thumbnail} alt="thumbnail" /></div></div>

            </div>
            {this.state.data.image.map((img) => <div key={img.slice(img.length - 20, img.length - 1)} className="carousel-item">
              <div><div className="row justify-content-center" style={{ "height": "300px" }}><img className="img-fluid img-test" src={img} alt="images" /></div></div>
            </div>)}
          </div>
          <a className="carousel-control-prev " style={{ "color": "red" }} href="#carouselExampleControls" role="button" data-slide="prev">
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
        <div className="col-lg-8">
          <div className="jumbotron fluid">
            <div>
              <h1 className="text-center" id="titre_cancer">{this.state.data.title}</h1>
            </div>
            <br />
            <div className="row align-items-center">
              {carousel}
              <div className="col-sm-6 text-center ">
                <h5 className="text-center">{"Cette annonce a été créée par " + this.state.data.author}</h5>
                <p className="card-text text-center" id="description">{this.state.data.description}</p>
                <a className="text-center" href={"https://linkcs.fr/user/" + this.state.data.author_login}><button className="btn btn-info col" style={{ "border-radius": "50px", "padding": "10px" }}  ><i class='fa fa-user' style={{ "color": "white", "margin-right": "2px" }}></i>LinkCS </button></a>
                {buttonUpdate}
                {buttonDelete}
              </div>
            </div>
          </div>
        </div>)
    }
    else { return (<div />) }
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

    if (this.props.data.title && this.props.data.title.length > 120) {
      return (this.props.data.title.slice(0, 100) + " ...");
    }
    else {
      return (this.props.data.title);
    }

  }

  printDescription = () => { // cut the description if too long

    if (this.props.data.description && this.props.data.description.length > 200) {
      return (this.props.data.description.slice(0, 150) + " ...");
    }
    else {
      return (this.props.data.description);
    }

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.updateParent("title", event.target.value);
  }

  render() {
    let className = "card h-100"//+ (this.props.data.type === "search" ? " bg-secondary" : " bg-success");
    if (this.props.data.thumbnail === "") {
      this.props.data.thumbnail = image
    }
    if (this.props.data.thumbnail === null) {
      this.props.data.thumbnail = image
    }
    return (<a className="style-1" href="#" style={{ "marginTop": "1rem", "marginLeft": "auto", "marginRight": "auto", "marginBottom": "1rem" }}>
      <div className={className} style={{ "width": "18rem" }} >
        <LinkContainer to={"/ad/" + this.props.data._id}>
          <img className="card-img-top test" style={{ "maxHeight": "1px" }} src={this.props.data.thumbnail} >
            <svg viewBox="-1.5 529.754 603 71.746" preserveAspectRatio="none" />
            <path d=" M 0 560 Q 66.018 533.115 153.816 571.235 C 241.613 609.355 293.526 571.416 310 560 C 346.774 534.516 402.903 510.645 450 560 Q 497.097 609.355 600 560 L 600 600 L 0 600 L 0 560 Z " />
          </img> </LinkContainer>
        <LinkContainer to={"/ad/" + this.props.data._id}>
          <div className="card-body ">
            <h5 className="card-title">{this.printTitle()}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.props.data.author + (this.props.data.reward ? " offre " + this.props.data.reward : "")}</h6>
            <p className="card-text">{this.printDescription()}</p>
          </div>
        </LinkContainer>
      </div>
    </a>
    )
  }
}
