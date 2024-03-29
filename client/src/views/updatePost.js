import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import Form from "../components/form";
import "./updatePost.css";
import logopalc from "../files/logopalc.png"
const cookies = new Cookies();


class UpdatePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      author: "",
      author_id: null,
      title: "",
      type: "",
      reward: "",
      description: "",
      thumbnail: null,
      image: [],
      data: [],
    }
    this.searchDataFromDb = this.searchDataFromDb.bind(this);
  }


  componentDidMount() {
    this.searchDataFromDb()
  }

  putDataToDB = (data) => { //post the ad to the DB

    axios.post("/api/updateData", {
      id: this.props.match.params.id, update: {
        title: data.title,
        type: data.type,
        reward: data.reward,
        description: data.description,
        thumbnail: data.thumbnail,
        image: data.image,
      }, auth: cookies.get("auth")
    }).then(setTimeout(() => this.props.history.push("/ad/" + this.props.match.params.id), 200)).catch(err => console.log(err));

  }

  searchDataFromDb = () => {
    axios.post("/api/searchById", { id: this.props.match.params.id, auth: cookies.get("auth") })
      .then(data => data.data).then(res => this.setState(res.data));

  };

  render() {

    if (this.state.author !== "") {
      return (
        <div>
          <Form putDataToDB={this.putDataToDB} data={this.state} />
        </div>
      )
    }
    else {
      return (
        <div className="app-loading">
          <img id="icon_spinner" src={logopalc} />
          <svg className="spinner" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
          </svg>
        </div>
      )
    }
  }
}


export default UpdatePost;
