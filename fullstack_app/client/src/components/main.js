import { Switch, Route } from 'react-router-dom'

import Home from './../views/home.js';
import Search from './../views/search.js';
import Found from './../views/found.js';
import CreatePost from './../views/createPost.js';
import Perso from './../views/perso.js';
import React, { Component } from 'react';
import SearchEngine from './../views/searchEngine.js';
import Banner from './banner.js';
const Main = () => (
  <main>
    <div className="container-fluid">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/createPost' component={CreatePost}/>
        <Route exact path='/found' component={Found}/>
        <Route exact path='/search' component={Search}/>
        <Route exact path='/perso' component={Perso}/>
        <Route exact path='/searchEngine/:searchText' component={SearchEngine}/>
      </Switch>
    </div>
  </main>
)

export default Main;
