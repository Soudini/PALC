import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';


const cookies = new Cookies();

class OauthEnd extends Component {
  searchDataFromDb = (searchText) => {


    axios.post("/api/getUserInfo", {code : cookies.get("code")})
      .then(data => {
        console.log(data.data.data)
        cookies.set("access_token", data.data.data["access_token"]);
        cookies.set("expires_at", data.data.data["expires_at"]);
        cookies.set("expires_in", data.data.data["expires_in"]);
        cookies.set("refresh_token", data.data.data["refresh_token"]);
      });}



  render(){
    let string = this.props.location.search.substr(1);
    string = string.split("&");
    console.log(string);
    const dict = {};
    for(let i = 0; i<string.length;i++){
      string[i] = string[i].split("=")
      dict[string[i][0]] = string[i][1];
    }
    console.log(cookies.get("code"),dict["code"],dict,cookies);
    cookies.set('code', dict["code"]);
    console.set("code", dict["code"]);
    this.props.history.push("/");
    this.searchDataFromDb();
    console.log(cookies)
    return true;
  }
}

export default withRouter(OauthEnd);
