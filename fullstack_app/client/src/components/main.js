import { Switch, Route } from 'react-router-dom'

import Home from './../views/home.js';
import Search from './../views/search.js';
import Found from './../views/found.js';
import CreatePost from './../views/createPost.js';
import Perso from './../views/perso.js';
import React, { Component } from 'react';
import SearchEngine from './../views/searchEngine.js';
import Banner from './banner.js';
import {Page} from './ad.js';
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
        </Switch>
      </div>
    </div>
)

export default Main;
