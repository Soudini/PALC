import { Switch, Route } from 'react-router-dom'

import All from './../views/all.js';
import Search from './../views/search.js';
import Found from './../views/found.js';
import CreatePost from './../views/createPost.js';
import Perso from './../views/perso.js';
import React from 'react';
import SearchEngine from './../views/searchEngine.js';
import { Page } from './ad.js';
import OauthEnd from './oauthend.js';
import Cookies from 'universal-cookie';
import UpdatePost from './../views/updatePost.js';
import Home from './../views/home.js';
import Page404 from './../views/page404';


let config = require('../config_client.json');

console.log(config);
function makeid() { // generate random state for the auth
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


const cookies = new Cookies();

let random = makeid();
cookies.set("state", random)


const Main = () => (

    <div>
      <Switch>
        <Route exact path='/all' component={All} />
        <Route exact path='/createPost' component={CreatePost} />
        <Route exact path='/found' component={Found} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/perso' component={Perso} />
        <Route exact path='/searchEngine/:searchText' component={SearchEngine} />
        <Route exact path='/ad/:id' component={Page} />
        <Route exact path='/oauth' component={() => { window.location = 'https://auth.viarezo.fr/oauth/authorize/?redirect_uri=' +config.redirect_uri+ '&client_id=279c525e5961df88feb2b6053f210f7537265270&response_type=code&state=' + random + '&scope=default'; return null; }} />
        <Route exact path='/oauthend' component={OauthEnd} />
        <Route exact path='/updatePost/:id' component={UpdatePost} />
        <Route exact path="/" component={Home} />
        <Route component={Page404} />
      </Switch>
  </div>
)

export default Main;
