import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import "./createPost.css";
import { loadReCaptcha, ReCaptcha } from 'recaptcha-v3-react';
const cookies = new Cookies();


class PostType extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: "search",
      reward: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  subFields(){
    if (this.state.type === "search") {
      return (
                <div><br/><p>Récompense</p><select className="form-control" onChange={(e) => this.handleChange(e,"secondary")}>
                  <option>Palc</option>
                  <option>Calin &lt;3</option>
                  <option>Rien :( </option>
                </select></div>);
    }
    else {
      return(null);
    }
  }

  handleChange(event,type) {
      if (type === "primary") {
        this.setState({type: event.target.value === "Annonce recherche"? "search":"found"});
        if (event.target.value !== "Annonce recherche"){
          this.props.updateParent("reward", null)
        }
        this.props.updateParent("type", event.target.value === "Annonce recherche"? "search":"found")
      }
      else if (type === "secondary") {
        this.props.updateParent("reward", event.target.value);
      }
  }

  render(){
    return(
          <div>
            <select className="form-control" onChange={(e) => this.handleChange(e,"primary")}>
              <option>Annonce recherche</option>
              <option>Annonce trouvaille</option>
            </select>
            {this.subFields()}
          </div>)
  }
}



class Description extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    this.props.updateParent("description", event.target.value)
  }

  render() {
    return (<div className="form-group">
      <textarea className="form-control" placeholder="Entrez une description brève de l'objet" onChange={this.handleChange}></textarea>
    </div>)
  }
}

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    this.props.updateParent("title", event.target.value)
  }

  render() {
    return (<div className="form-group">
      <input className="form-control" placeholder="Entrez le titre de votre annonce" onChange={this.handleChange}></input>
    </div>)
  }
}



class CreatePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type:"search",
      reward: "Palc",
      title: null,
      description: null,
      thumbnail : null,
      image: [],
      data: [],
      reCaptchaToken : null,
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);

    this.handleThumbnail = this.handleThumbnail.bind(this);
  }


  componentDidMount() {
    loadReCaptcha({key : "6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR", id : 42}).then(id => {
        console.log('ReCaptcha loaded', id)
      });
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  }

  updateParent(key, value) {
    this.setState({[key]: value});
  }

  handleSubmit(event) {
      this.putDataToDB(this.state);
      this.props.history.push("/");
  }

  handleThumbnail(event) {
    var reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e) => {

        var img = new Image();
        img.src = e.target.result;
        img.onload = () => {var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 400;
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        let dataurl = canvas.toDataURL("image/jpeg");
        this.setState({thumbnail:dataurl});}
    }
    reader.readAsDataURL(file);

  }

  handleImage(event) {

    for (let i = 0; i<event.target.files.length; i++) {
      var reader = new FileReader();
      let file = event.target.files[i];
      reader.onloadend = (e) => {

          var img = new Image();
          img.src = e.target.result;
          img.onload = () => {var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var MAX_WIDTH = 400;
            var MAX_HEIGHT = 400;
            var width = img.width;
            var height = img.height;
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            let dataurl = canvas.toDataURL("image/jpeg");
            const image = this.state.image.slice();
            image.push(dataurl);
            this.setState({image: image})}
          }
      reader.readAsDataURL(file);
      }
  }


  putDataToDB = infos => {
    console.log("test",cookies.get("login"));
    axios.post("/api/putData", {
      author : cookies.get("firstName") + " " + cookies.get("lastName"),
      author_id : cookies.get("id"),
      author_login : cookies.get("login"),
      title: infos.title,
      type: infos.type,
      reward: this.state.reward,
      description: infos.description,
      thumbnail: infos.thumbnail,
      image: infos.image,
      reCaptchaToken : infos.reCaptchaToken,
    });
    console.log("reCaptchaToken", infos.reCaptchaToken);
  };





  deleteImage = (e) => {this.setState({image:[]})}
  deleteThumbnail = (e) => {this.setState({thumbnail: null})}

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  verifyCallbackCaptcha = (token) => {
    console.log("token", token)
    this.setState({reCaptchaToken : token});
  };

  render () {
      let {thumbnail} = this.state;
      let $thumbnailPreview = <div className="form-group col-6">
                                <div className="row justify-content-center">
                                  <label>Ajoutez une image de l'objet</label>
                                  <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" onChange={this.handleThumbnail} />
                                </div>
                              </div>;
      if (thumbnail) {
        $thumbnailPreview = <div className="col-sm container-fluid">
                              <div className="row justify-content-center">
                                <img className="img-fluid img-thumbnail row" src={thumbnail} style={{"height" : "200px"}} />
                              </div>
                              <div className="row justify-content-center">
                                <button type="button" className="btn btn-danger" style={{"marginTop": "1rem","marginBottom": "1rem"}} onClick={this.deleteThumbnail}>Supprimer cette image</button>
                              </div>
                            </div>;
      }
      let {image} = this.state;
      let $imagePreview = <div className="form-group col-6">
                            <div className="row justify-content-center">
                              <label>Ajoutez des images supplémentaires si possible</label>
                              <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" onChange={this.handleImage} multiple/>
                            </div>
                          </div>;
      if (image.length) {
         $imagePreview = <div className="col-sm">

                         <div id="carouselExampleControls" className="row carousel slide align-items-center" data-ride="carousel">
                         <div className="carousel-inner" >
                           <div className="carousel-item active">
                           <div><div className="row justify-content-center" style={{"height" : "200px"}}><img className="h-100 img-fluid " src={image[0]} alt="Second slide"/></div></div>

                           </div>
                           {image.slice(1).map((img) =><div key={img.slice(img.length-20,img.length-1)} className="carousel-item">
                             <div><div className="row justify-content-center" style={{"height" : "200px"}}><img className="h-100 img-fluid " src={img} alt="Second slide"/></div></div>
                           </div>)}
                         </div>
                           <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                             <span className="sr-only">Previous</span>
                           </a>
                           <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
                             <span className="sr-only">Next</span>
                           </a>
                          </div>
                          <div className="row justify-content-center">
                            <button type="button" className="btn btn-danger" style={{"marginTop": "1rem","marginBottom": "1rem"}} onClick={this.deleteImage}>Supprimer ces images</button>
                          </div></div>;
      }

      let type = <PostType updateParent={this.updateParent}/>;
      let description = <Description updateParent={this.updateParent}/>;
      let title = <Title updateParent={this.updateParent}/>;
      return (
        <div>
          <form >
              <div>Quel est le type d'annonce que vous voulez poster ?</div>
                {type}
                <br/>
                {title}
                <br/>
                {description}
              <div className="row justify-content-center d-flex">
                {$thumbnailPreview}
                {$imagePreview}

              </div>
              <br/>
              <button type="button" onClick={(e) => this.handleSubmit(e)} className="btn btn-primary">Submit</button>
              <ReCaptcha
                          sitekey="6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR"
                          action='submitAd'
                          verifyCallback={this.verifyCallback}
                      />
          </form>
        </div>

      )
   }
}


export default CreatePost;
