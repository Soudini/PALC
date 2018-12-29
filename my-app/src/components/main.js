import { Switch, Route } from 'react-router-dom'

import Home from './../views/home.js';
import Searched from './../views/searched.js';
import Found from './../views/found.js';
import CreatePost from './../views/createPost.js';
import Perso from './../views/perso.js';
import React, { Component } from 'react';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/createPost' component={CreatePost}/>
      <Route exact path='/found' component={Found}/>
      <Route exact path='/searched' component={Searched}/>
      <Route exact path='/perso' component={Perso}/>

    </Switch>
  </main>
)

export default Main;
