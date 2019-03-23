import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import "./banner.css";
import { loadReCaptcha } from 'recaptcha-v3-react';
import logopalc from "../files/logopalc.png";
import logopalccontour from "../files/logopalccontour.png";


let date = new Date();
const cookies = new Cookies();


class Banner extends Component {
  state = {
    search: "",
  }

  componentDidMount = () => {

    setTimeout(this.checkAuth, 200); // prevent spam bounce (it is executed at each opening of the website)
    loadReCaptcha({ key: "6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR", id: "reCaptcha" }).then(id => { // load recaptcha with the website key
      console.log('ReCaptcha loaded', id);
    });
    this.killReCaptchaBadge(); // hide the reCaptcha badge (it means that we have to state that we are using it btw)

  }


  killReCaptchaBadge = () => { //hide the badge

    let recaptchaBadge = document.getElementsByClassName("grecaptcha-badge")
    if (recaptchaBadge.length) {
      recaptchaBadge[0].style.display = "none"; // hide the bage
    }
    else {
      setTimeout(this.killReCaptchaBadge, 50); // if not yet loaded retry after 50 ms
    }

  }
  checkAuth = () => { //check if auth is still valable
    date = new Date();
    if (!cookies.get("expires_at") | cookies.get("expires_at") < date.getTime() / 1000) {
      this.props.history.push("/oauth");
    }
    setTimeout(this.checkAuth, 5000); //check every 5s
  }

  handleKeyPress = (e) => { // search if enter is pressed in the search bar

    if (e.key === 'Enter') {
      if (this.state.search == "") {
        this.props.history.push("/");
      }
      else {
        this.props.history.push("/searchEngine/" + this.state.search);
      }
    }

  }

  handlePageChange = (page) => { // navigate between pages

    this.props.history.push("/" + page);
    if (document.getElementById("navbar").classList.contains("show")) {
      document.getElementById("navbar-toggler").click();
    }
  }

  handleSearchText = (e) => { // update the state of the component with the content of the search bar
    this.setState({ search: e.target.value })
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-xl navbar-dark col-lg-12">
        <a className="navbar-brand" href="" onClick={() => this.handlePageChange("")}><img src={logopalccontour} width="40" height="40" class="img-fluid" alt="Responsive image"
          onMouseOver={this.src = logopalc}
          onMouseOut={this.src = logopalccontour} />&nbsp; PALC</a>
        <button className="navbar-toggler" id="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className={"nav-item" + (this.props.history.location.pathname == "/all" ? " active" : "")}>
              <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("all")}>Toutes les annonces <span className="sr-only">(current)</span></a>
            </li>
            <li className={"nav-item" + (this.props.history.location.pathname == "/search" ? " active" : "")}>
              <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("search")}>Recherche <span className="sr-only">(current)</span></a>
            </li>
            <li className={"nav-item" + (this.props.history.location.pathname == "/found" ? " active" : "")}>
              <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("found")}>Trouvaille <span className="sr-only">(current)</span></a>
            </li>
            <li className={"nav-item" + (this.props.history.location.pathname == "/createPost" ? " active" : "")}>
              <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("createPost")}>Créer une annonce <span className="sr-only">(current)</span></a>
            </li>
            <li className={"nav-item" + (this.props.history.location.pathname == "/perso" ? " active" : "")}>
              <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("perso")}>Mon compte<span className="sr-only">(current)</span></a>
            </li>
          </ul>
          <input id="searchBar" className="form-control mr-sm-2 col-sm-2" style={{ "marginBottom": "1rem", "marginTop": "1rem" }} onKeyPress={this.handleKeyPress} placeholder="Search" aria-label="Search" onChange={this.handleSearchText}></input>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handlePageChange("searchEngine/" + this.state.search)}>
            <strong>Chercher une annonce</strong>
          </button>
        </div>
      </nav>
    )
  }

}

export default withRouter(Banner);
