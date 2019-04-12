import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import Form from "../components/form";
const cookies = new Cookies();

class CreatePost extends Component { //parent component

  constructor(props) {
    super(props)
  }

  putDataToDB = (data) => { //post the ad to the DB
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
    }).then(res => {
      if (res.data.success) {
        alert("Annonce postée avec succès")
      }
      else {
        alert("L'annonce n'a pas pu être postée, veuillez recharger la page et réessayer");
      }
    })
  }

 

  render() {
    return(
      <div>
        <Form putDataToDB={this.putDataToDB} data={{}}/>
      </div>
    )
  }
}


export default CreatePost;
