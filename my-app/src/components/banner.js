import React, { Component } from 'react';
import './banner.css';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav} from 'react-bootstrap';

class Banner extends Component{
  render(){
    return(
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
        <LinkContainer to="/">
          <Nav.Item>
            <a className="navbar-brand" href="#">Objets-Trouvés</a>
          </Nav.Item>
        </LinkContainer>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

          <LinkContainer to="/search">
            <Nav.Item>
            <li className="nav-item">
              <a className="nav-link" href="#">Annonces Recherche <span className="sr-only">(current)</span></a>
            </li>
            </Nav.Item>
          </LinkContainer>
          <LinkContainer to="/found">
            <Nav.Item>
            <li className="nav-item">
              <a className="nav-link" href="#">Annonces Trouvaille <span className="sr-only">(current)</span></a>
            </li>
            </Nav.Item>
          </LinkContainer>
          <LinkContainer to="/createPost">
            <Nav.Item>
            <li className="nav-item">
              <a className="nav-link" href="#">Créer une annonce <span className="sr-only">(current)</span></a>
            </li>
            </Nav.Item>
          </LinkContainer>
          <LinkContainer to="/perso">
            <Nav.Item>
            <li className="nav-item">
              <a className="nav-link" href="#">Mon Compte <span className="sr-only">(current)</span></a>
            </li>
            </Nav.Item>
          </LinkContainer>

          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="uih">Chercher une annonce</button>
          </form>
        </div>
      </nav>
    )
  }

}

export default Banner;


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
