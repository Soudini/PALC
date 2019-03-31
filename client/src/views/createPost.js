import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import "./createPost.css";
import { loadReCaptcha, ReCaptcha } from 'recaptcha-v3-react';
const cookies = new Cookies();

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {console.log(reader.result);resolve(reader.result);};
    reader.onerror = error => reject(error);
  });
}

class PostType extends Component { // selctor for the post type

  constructor(props){
    super(props)
    this.state = {
      type: "search",
      reward: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  subFields(){ // if the post type is search display the possible rewards
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

  handleChange(event,type) { // handle change of type of post
      if (type === "primary") {
        this.setState({type: event.target.value === "Annonce recherche"? "search":"found"});
        if (event.target.value !== "Annonce recherche"){
          this.props.updateParent("reward", null);// update parent component (defined below)
        }
        this.props.updateParent("type", event.target.value === "Annonce recherche"? "search":"found") ; // update parent component (defined below)
      }
      else if (type === "secondary") {
        this.props.updateParent("reward", event.target.value); // update parent component (defined below)
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



class Description extends Component { // text area for description
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { //handle change and set state of the component with the content of the text area
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



class CreatePost extends Component { //parent component

  constructor(props) {
    super(props)
    this.state = {
      type:"search",
      reward: "Palc",
      title: "",
      description: "",
      thumbnail : null,
      image: [],
      data: [],
      reCaptchaToken : null,
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  updateParent(key, value) { //allow children component to setState of this component
    this.setState({[key]: value});
  }

  handleSubmit(event) { // check if the ads fullfil the requirements
    if (this.state.title == "" | this.state.description == ""){
      alert("Veuillez entrer un titre et une description")
    }
    else if (this.state.description.length > 1000 | this.state.title.length > 300){
      alert("la description doit contenir moins de 1000 caractères et le titre moins de 300")
    }
    else    {
        this.putDataToDB();
      };
  }

  handleImage(event) { //import, convert and resize the images
    if (event.target.files.length > 5){
      alert("Le nombre d'image est limité à 5")
    }
    else {
      getBase64(event.target.files[0]).then(data => this.setState({thumbnail:data}));
      let list_files = [];
      for (let i=1; i<event.target.files.length; i++){
        list_files.push(event.target.files[i])
      }
     Promise.all(list_files.map( (file) => getBase64(file))).then( data => this.setState({image:data}));
    }
  }


  putDataToDB = () => { //post the ad to the DB
    axios.post("/api/putData", {
      author : cookies.get("firstName") + " " + cookies.get("lastName"),
      author_id : cookies.get("id"),
      author_login : cookies.get("login"),
      title: this.state.title,
      type: this.state.type,
      reward: this.state.reward,
      description: this.state.description,
      thumbnail: this.state.thumbnail,
      image: this.state.image,
      reCaptchaToken : this.state.reCaptchaToken,
      auth : cookies.get("auth")
    }).then(() => {setTimeout(() => this.props.history.push("/all"), 400); loadReCaptcha({key : "6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR", id : "reCaptcha"}); this.killReCaptchaBadge()});
  }

  killReCaptchaBadge = () => { //hide the badge

    let recaptchaBadge = document.getElementsByClassName("grecaptcha-badge")
    if (recaptchaBadge.length) {
      recaptchaBadge[0].style.display = "none"; // hide the bage
    }
    else {
      setTimeout(this.killReCaptchaBadge,50); // if not yet loaded retry after 50 ms
    }

  }

  deleteImage = (e) => { // delete images
    this.setState({image:[]});
  }


  deleteThumbnail = (e) => { //delete thumbnail
    this.setState({thumbnail: null});
  }


  verifyCallbackCaptcha = (token) => { // get token from captcha
    this.setState({reCaptchaToken : token});
  }

  render () {
      let {image} = this.state;
      //if no images ask for one else display it/them and offer to delete it/them

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
                           <div><div className="row justify-content-center" style={{"height" : "200px"}}><img className="h-100 img-fluid " src={this.state.thumbnail} alt="Second slide"/></div></div>

                           </div>
                           {image.map((img) =><div key={img.slice(img.length-20,img.length-1)} className="carousel-item">
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
            <ReCaptcha
            action='submitAd'
            sitekey="6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR"
            verifyCallback={this.verifyCallbackCaptcha}
            />
          <form >
              <div>Quel est le type d'annonce que vous voulez poster ?</div>
                {type}
                <br/>
                {title}
                <br/>
                {description}
              <div className="row justify-content-center d-flex">

                {$imagePreview}

              </div>
              <br/>
              <button type="button" onClick={(e) => this.handleSubmit(e)} className="btn btn-primary">Submit</button>
          </form>
          <h6 style={{"marginTop" : "1rem"}} className="font-weight-light">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</h6>
        </div>

      )
   }
}


export default CreatePost;
