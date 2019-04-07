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
      loader : true,
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
    }, auth : cookies.get("auth") }).then(this.state.loader = true).catch(err => console.log(err));
    this.props.history.push("/ad/"+this.props.match.params.id);


    axios.post("/api/putData", {
      author: cookies.get("firstName") + " " + cookies.get("lastName"),
      author_id: cookies.get("id"),
      author_login: cookies.get("login"),
      title: data.title,
      type: data.type,
      reward: data.reward,
      description: data.description,
      thumbnail: data.thumbnail,
      image: data.image,
      reCaptchaToken: data.reCaptchaToken,
      auth: cookies.get("auth")
    }).then(() => { setTimeout(() => this.props.history.push("/all"), 400); loadReCaptcha({ key: "6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR", id: "reCaptcha" }); this.killReCaptchaBadge() });
  }

  searchDataFromDb = () => {
    axios.post("/api/searchById", {id :this.props.match.params.id, auth : cookies.get("auth")})
      .then(data => data.data).then(res => {for (let i in res.data) {this.setState({[i] : res.data[i]})}});
  };

  render () {
      <div>
        <Form putDataToDB={this.putDataToDB} data = {this.state}/>
      </div>
   }
}


export default UpdatePost;
