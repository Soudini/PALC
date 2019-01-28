import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

let cookies = new Cookies();


class OauthEnd extends Component {
  searchDataFromDb = (searchText) => {


    axios.post("http://localhost:3001/api/getUserInfo", {code : cookies.get("code")})
      .then(data => {
        console.log("response", data.data.data);
        for (var i in data.data.data){
          cookies.set(i, data.data.data[i]);
      }});}



  render(){
    let string = this.props.location.search.substr(1);
    string = string.split("&");
    const dict = {};
    for(let i = 0; i<string.length;i++){
      string[i] = string[i].split("=")
      dict[string[i][0]] = string[i][1];
    }
    cookies.set('code', dict["code"]);
    this.props.history.push("/");
    this.searchDataFromDb();
    console.log(cookies)
    return true;
  }
}

export default withRouter(OauthEnd);
