import { Switch, Route } from 'react-router-dom'

import Home from './../views/home.js';
import Search from './../views/search.js';
import Found from './../views/found.js';
import CreatePost from './../views/createPost.js';
import Perso from './../views/perso.js';
import React from 'react';
import SearchEngine from './../views/searchEngine.js';
import {Page} from './ad.js';
import OauthEnd from './oauthend.js';
import Cookies from 'universal-cookie';


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



const cookies = new Cookies();

let random = makeid();
cookies.set("state",random)


const Main = () => (
  <div className="col-lg-12">
      <div className="container-fluid">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/createPost' component={CreatePost}/>
          <Route exact path='/found' component={Found}/>
          <Route exact path='/search' component={Search}/>
          <Route exact path='/perso' component={Perso}/>
          <Route exact path='/searchEngine/:searchText' component={SearchEngine}/>
          <Route exact path='/ad/:id' component={Page}/>
          <Route exact path='/oauth' component={() => { window.location = 'https://auth.viarezo.fr/oauth/authorize/?redirect_uri=http://138.195.139.246/oauthend&client_id=279c525e5961df88feb2b6053f210f7537265270&response_type=code&state='+random+'&scope=default'; return null;} }/>
          <Route exact path='/oauthend' component={OauthEnd}/>
        </Switch>
      </div>
    </div>
)

export default Main;
