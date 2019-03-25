import React, { Component } from 'react';
import './App.css';
import Main from './components/main.js';
import Banner from './components/banner.js';
import Cookies from 'universal-cookie';
import $ from 'jquery';
window.$ = $;

/* je sais pas où mettre le code si dessous, donc  je le mets là (PS: c'est pour la searchBar)*/
$("#inpt_search").on('focus', function () {
  $(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function () {
  if ($(this).val().length == 0)
    $(this).parent('label').removeClass('active');
});
/* ---------------------------------------------------------------------------------------------*/

const cookies = new Cookies();

const date = new Date();

class App extends Component {

  componentDidMount = () => {
  }

  render() {

    return (
      <div className="container-fluid">
        <Banner />
        <br></br><br></br><br></br><br></br>
        <Main />
      </div>
    );
  }
}

export default App;
