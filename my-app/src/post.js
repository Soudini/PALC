import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Body from './Body';
import App from './App';
import Button from './Button';
import Banner from './Banner';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Banner />, document.getElementById('banner'))
ReactDOM.render(<Body />, document.getElementById('Body'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
