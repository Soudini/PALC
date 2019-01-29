import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import "./banner.css";
const date = new Date();
const cookies = new Cookies();


class Banner extends Component{
  state = {
    search: "",
  }

  componentDidMount = () => {
    this.checkAuth();
    cookies.set("id", 7425);
    console.log(date.getTime()/1000);
    console.log(cookies);

  }

  checkAuth = () => {
    if (!cookies.get("expires_at") | cookies.get("expires_at") < date.getTime()/1000){
      this.props.history.push("/oauth");
    }
    setTimeout(this.checkAuth, 5000);
  }
  handleKeyPress = (e) =>
  {

    if (e.key === 'Enter') {
      this.props.history.push("/searchEngine/"+this.state.search);
    }

  }
  handlePageChange = (page) => { this.props.history.push("/" +page)}

  handleSearchText = (e) => {this.setState({search: e.target.value})}
  render(){

    return(
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark col-lg-12">
        <a className="navbar-brand" data-toggle="collapse" href="#navbar"  onClick={() => this.handlePageChange("")}>Objets-Trouvés</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("search")}>Recherche <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("found")}>Trouvaille <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("createPost")}>Créer une annonce <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-pointer" onClick={() => this.handlePageChange("perso")}>Mon compte<span className="sr-only">(current)</span></a>
          </li>


          </ul>
            <input id="searchBar" className="form-control mr-sm-2 col-sm-2" onKeyPress={this.handleKeyPress} placeholder="Search" aria-label="Search" onChange={this.handleSearchText}></input>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handlePageChange("searchEngine/"+this.state.search)}>
                <strong>Chercher une annonce</strong>
            </button>
        </div>
      </nav>
    )
  }

}

export default withRouter(Banner);


/*      <Navbar inverse bg-dark>
          <Navbar.Brand>
            <a href="#home">React-Bootstrap</a>
          </Navbar.Brand>
        <Nav>
          <Nav.Item eventKey={1} href="#">
            Link
          </Nav.Item>
          <Nav.Item eventKey={2} href="#">
            Link
          </Nav.Item>
          <Dropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <Dropdown.Item eventKey={3.1}>Action</Dropdown.Item>
            <Dropdown.Item eventKey={3.2}>Another action</Dropdown.Item>
            <Dropdown.Item eventKey={3.3}>Something else here</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item eventKey={3.4}>Separated link</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar>*/
