import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

let cookies = new Cookies();


class OauthEnd extends Component {
  searchDataFromDb = (searchText) => {//get user info from the auth through the back for security reasons

    axios.post("/api/getUserInfo", {code : cookies.get("code")})
      .then(data => {
          for (var i in data.data.data){
            cookies.set(i, data.data.data[i]);
            }
          this.props.history.push("/");
      });

    }



  render(){ // unpack the infos from the auth
    let string = this.props.location.search.substr(1);
    string = string.split("&");
    const dict = {};
    for(let i = 0; i<string.length;i++){
      string[i] = string[i].split("=")
      dict[string[i][0]] = string[i][1];
    }
    cookies.set('code', dict["code"]);
    this.searchDataFromDb();
    return true;
  }
}

export default withRouter(OauthEnd);
