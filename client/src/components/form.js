import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "./form.css";
import imageCompression from 'browser-image-compression';
import { withRouter } from 'react-router-dom';
import { loadReCaptcha, ReCaptcha } from 'recaptcha-v3-react';
const cookies = new Cookies();

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { console.log(reader.result); resolve(reader.result); };
    reader.onerror = error => reject(error);
  });
}



class PostType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "search",
      reward: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  subFields() {
    if (this.props.type === "search") {
      let optionsReward = { Palc: "Palc", "Calin <3": "Calin <3", Rien: "Rien" }
      let opt = [<option disabled hidden selected>Choisissez votre récompense</option>];
      for (let i in optionsReward) {

        if (i === this.props.reward) {
          opt.push(<option selected="True" key={i}>{optionsReward[i]}</option>);
        }
        else {
          opt.push(<option key={i}>{optionsReward[i]}</option>);
        }
      }
      return (
        <div>
          <select name="subject" id="subject_input" onChange={(e) => this.handleChange(e, "secondary")} required>
            {opt}
          </select></div>);
    }
    else {
      return (null);
    }
  }

  handleChange(event, type) {
    if (type === "primary") {
      this.setState({ type: event.target.value === "Annonce recherche" ? "search" : "found" });
      if (event.target.value !== "Annonce recherche") {
        this.props.updateParent("reward", null)
      }
      this.props.updateParent("type", event.target.value === "Annonce recherche" ? "search" : "found")
    }
    else if (type === "secondary") {
      this.props.updateParent("reward", event.target.value);
    }
  }

  render() {
    let optionsType = { search: "Annonce recherche", found: "Annonce trouvaille" }
    let opt = [<option disabled hidden selected>Quel type d'annonce voulez-vous faire ?</option>];
    for (let i in optionsType) {
      if (i === this.props.type) {
        opt.push(<option selected key={i}>{optionsType[i]}</option>);
      }
      else {
        opt.push(<option key={i}>{optionsType[i]}</option>);
      }
    }
    return (
      <div>
        <select name="subject" id="subject_input" onChange={(e) => this.handleChange(e, "primary")} required>
          {opt}
        </select>
        {this.subFields()}
      </div>)
  }
}




class Description extends Component { // text area for description
  constructor(props) {
    super(props)
    this.state = {
      text: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { //handle change and set state of the component with the content of the text area
    this.setState({ text: event.target.value })
    this.props.updateParent("description", event.target.value)
  }

  render() {
    return (<div className="message">
      <label for="message"></label>
      <textarea name="message" placeholder="Entrez une description brève de votre annonce" id="description_input" value={this.props.description} onChange={this.handleChange} cols="30" rows="5"></textarea>
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
    this.setState({ value: event.target.value })
    this.props.updateParent("title", event.target.value)
  }

  render() {
    return (<div className="title">
      <label for="name"></label>
      <input type="text" name="message" placeholder="Entrez le titre de votre annonce" name="title" id="title_input" value={this.props.title} onChange={this.handleChange}></input>
    </div>)
  }
}



class Form extends Component { //parent component

  constructor(props) {
    super(props)
    this.state = {
      type: "search",
      reward: "Palc",
      title: "",
      description: "",
      thumbnail: null,
      image: [],
      data: [],
      reCaptchaToken: null,
      imageLoading: false,
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidMount() {
    if (this.props.data !== {}) {
      this.setState(this.props.data, console.log(this.props.data, this.state));
    }
  }

  updateParent(key, value) { //allow children component to setState of this component
    this.setState({ [key]: value });
  }

  handleSubmit(event) { // check if the ads fullfil the requirements
    if (this.state.title == "" | this.state.description == "") {
      alert("Veuillez entrer un titre et une description.")
    }
    else if (this.state.description.length > 1000 | this.state.title.length > 300) {
      alert("La description doit contenir moins de 1000 caractères et le titre moins de 300.")
    }
    else if (this.state.imageLoading) {
      alert("Les images sont toujours en train d'être chargées, veuillez réessayer dans quelques instants.")
    }
    else {
      this.props.putDataToDB(this.state);
      loadReCaptcha({ key: "6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR", id: "reCaptcha" });
      this.setState({
        type: "search",
        reward: "Palc",
        title: "",
        description: "",
        thumbnail: null,
        image: [],
        data: []
      });
      this.killReCaptchaBadge();
    };
  }

  handleImage(event) { //import, convert and resize the images
    var options = {
      maxSizeMB: .4,
      maxWidthOrHeight: 400,
      useWebWorker: true
    } 
    if (event.target.files.length > 5) {
      alert("Le nombre d'image est limité à 5")
    }
    else {
      if (event.target.files) {
        this.setState({ imageLoading: true })
        imageCompression(event.target.files[0], options).then((data) => imageCompression.getDataUrlFromFile(data)).then(data => {console.log(data); this.setState({ thumbnail: data })});
        let list_files = [];
        for (let i = 1; i < event.target.files.length; i++) {
          list_files.push(event.target.files[i])
        }
        Promise.all(list_files.map((file) => imageCompression(file, options))).then(data => this.setState({ image: data, imageLoading: false }));
      }
    }
  }



  killReCaptchaBadge = () => { //hide the badge

    let recaptchaBadge = document.getElementsByClassName("grecaptcha-badge")
    if (recaptchaBadge.length) {
      recaptchaBadge[0].style.display = "none"; // hide the bage
    }
    else {
      setTimeout(this.killReCaptchaBadge, 50); // if not yet loaded retry after 50 ms
    }

  }

  deleteImage = (e) => { // delete images
    this.setState({ image: [] });
    this.setState({ thumbnail: null });
  }


  deleteThumbnail = (e) => { //delete thumbnail
    this.setState({ thumbnail: null });
  }


  verifyCallbackCaptcha = (token) => { // get token from captcha
    this.setState({ reCaptchaToken: token });
  }

  render() {


    let { image } = this.state;
    //if no images ask for one else display it/them and offer to delete it/them

    let $imagePreview = <div><div className="upload-btn-wrapper" style={{ "float": "left" }} >
      <button className="btn10" style={{ "width": "100%" }}>Choisissez vos images
      <input type="file" name="myfile" class="inputfile" accept="image/*" onChange={this.handleImage} multiple /></button>
      <label></label>
    </div></div>;
    if (image.length | (this.state.thumbnail !== null & this.state.thumbnail !== "")) {
      $imagePreview = <div className="col-sm">

        <div id="carouselExampleControls" className="row carousel slide align-items-center" data-ride="carousel">
          <div className="carousel-inner" >
            <div className="carousel-item active">
              <div><div className="row justify-content-center" style={{ "height": "200px" }}><img className="h-100 img-fluid " src={this.state.thumbnail} alt="Second slide" /></div></div>

            </div>
            {image.map((img) => <div key={img.slice(img.length - 20, img.length - 1)} className="carousel-item">
              <div><div className="row justify-content-center" style={{ "height": "200px" }}><img className="h-100 img-fluid " src={img} alt="Second slide" /></div></div>
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
          <button type="button" className="btn btn-danger" style={{ "marginTop": "1rem", "marginBottom": "1rem" }} onClick={this.deleteImage}>Supprimer ces images</button>
        </div></div>;
    }

    let type = <PostType updateParent={this.updateParent} type={this.state.type} reward={this.state.reward} />;
    let description = <Description updateParent={this.updateParent} description={this.state.description} />;
    let title = <Title updateParent={this.updateParent} title={this.state.title} />;
    return (
      <div>
        <ReCaptcha
          action='submitAd'
          sitekey="6LcpTZAUAAAAAAFSVV4wHy98dnjHW8Ylf-YIC9OR"
          verifyCallback={this.verifyCallbackCaptcha}
        />
        <div id="container">
          <br />
          <h2>&bull; Créer une annonce &bull;</h2>
          <br />
          <div className="underline">
          </div>
          <form id="contact_form" >

            {type}
            <br />
            {title}
            <br />
            {description}
            <div className="row justify-content-center d-flex">

              {$imagePreview}

            </div>
            <br />
            <div className="" style={{ "text-align": "center" }}>
              <button href="#" onClick={(e) => { e.preventDefault(); this.handleSubmit(e) }} id="form_button">Envoyer</button>
            </div>
          </form>
        </div>
        <h6 style={{ "marginTop": "1rem", "color": "rgb(100, 57, 0)" }} className="font-weight-light text-center">This site is protected by reCAPTCHA and the Google <a style={{ "marginTop": "1rem", "color": "#F9B804" }} href="https://policies.google.com/privacy">Privacy Policy</a> and <a style={{ "marginTop": "1rem", "color": "#F9B804" }} href="https://policies.google.com/terms">Terms of Service</a> apply.</h6>
      </div>


    )
  }
}


export default withRouter(Form);
