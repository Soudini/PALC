import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import Form from "../components/form";
const cookies = new Cookies();


class UpdatePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      author : "",
      author_id : null,
      title: "",
      type: "",
      reward: "",
      description: "",
      thumbnail: null,
      image: [],
      data: [],
      loaded : false,
    }
    this.searchDataFromDb = this.searchDataFromDb.bind(this);
  }


  componentDidMount() {
    this.searchDataFromDb()
  }
  
  putDataToDB = (data) => { //post the ad to the DB

    axios.post("/api/updateData", {id :this.props.match.params.id, update : {
      title: data.title,
      type: data.type,
      reward: data.reward,
      description: data.description,
      thumbnail: data.thumbnail,
      image: data.image,
    }, auth : cookies.get("auth") }).catch(err => console.log(err));
    this.props.history.push("/ad/"+this.props.match.params.id);
  }

  searchDataFromDb = () => {
    axios.post("/api/searchById", {id :this.props.match.params.id, auth : cookies.get("auth")})
      .then(data => data.data).then(res => this.setState(res.data)).then(this.setState({loaded:true}));
    
  };

  render () {

    if (this.state.loaded){
      console.log(this.state);
      return(
        <div>
          <Form putDataToDB={this.putDataToDB} data = {this.state}/>
        </div>
      )
    }
    else {
      return (
        <div className="app-loading">
          <img id="icon_spinner" src="../../public/logopalc.png"/>
          <svg className="spinner" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
          </svg>
        </div>
      )
    }
  }
}


export default UpdatePost;
