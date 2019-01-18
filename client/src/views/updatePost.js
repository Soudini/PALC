import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import "./updatePost.css"
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
    if (this.props.type === "search") {
      let optionsReward = {Palc: "Palc","Calin <3": "Calin <3", Rien : "Rien"}
      let opt = [];
      for (let i in optionsReward){

        if (i == this.props.reward){
          opt.push(<option selected="True" key={i}>{optionsReward[i]}</option>);
        }
        else{
          opt.push(<option key={i}>{optionsReward[i]}</option>);
        }
      }
      return (
                <div><br/><p>Récompense</p><select className="form-control" onChange={(e) => this.handleChange(e,"secondary")}>
                  {opt}
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
    let optionsType = {search:"Annonce recherche", found:"Annonce trouvaille"}
    let opt = [];
    for (let i in optionsType){
      if (i == this.props.type){
        opt.push(<option selected key={i}>{optionsType[i]}</option>);
      }
      else{
        opt.push(<option key={i}>{optionsType[i]}</option>);
      }
    }
    return(
          <div>
            <select className="form-control" onChange={(e) => this.handleChange(e,"primary")}>
              {opt}
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
      <textarea className="form-control" value={this.props.text} placeholder="Entrez une description brève de l'objet" onChange={this.handleChange}>{this.props.text}</textarea>
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
      <input className="form-control" placeholder="Entrez le titre de votre annonce" value={this.props.text} onChange={this.handleChange}></input>
    </div>)
  }
}



class CreatePost extends Component {

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
      image: null,
      data: [],
      loader : true,
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);

    this.searchDataFromDb = this.searchDataFromDb.bind(this);
    this.handleThumbnail = this.handleThumbnail.bind(this);
  }


  componentDidMount() {this.searchDataFromDb()}

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  }

  updateParent(key, value) {
    this.setState({[key]: value});

  }

  handleSubmit(event) {
    this.putDataToDB(this.state)
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
        var MAX_WIDTH = 200;
        var MAX_HEIGHT = 200;
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
        var ctx = canvas.getContext("2d");
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
            var MAX_WIDTH = 200;
            var MAX_HEIGHT = 200;
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
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            let dataurl = canvas.toDataURL("image/jpeg");
            const image = this.state.image.slice();
            image.push(dataurl);
            this.setState({image: image})}
          }
      reader.readAsDataURL(file);
      }
  }

  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => {this.setState({ data: res.data })});

  };


  handleSubmit =()=> {


        setTimeout(axios.post("/api/updateData", {id :this.props.match.params.id, update : {
          author : cookies.get("firstName") + " " + cookies.get("lastName"),
          author_id : cookies.get("id"),
          title: this.state.title,
          type: this.state.type,
          reward: this.state.reward,
          description: this.state.description,
          thumbnail: this.state.thumbnail,
          image: this.state.image,
        } }).then(this.state.loader = true).catch(err => console.log(err))
        , 10000);
        this.props.history.push("/ad/"+this.props.match.params.id);
  }

  searchDataFromDb = () => {
    axios.post("/api/searchById", {id :this.props.match.params.id })
      .then(data => data.data).then(res => {for (let i in res.data) {this.setState({[i] : res.data[i]})}});
  };

  render () {

      if (this.state){
      let thumbnailPreviewUrl = this.state.thumbnail;
      let $thumbnailPreview = null;
      if (thumbnailPreviewUrl) {
        $thumbnailPreview = (<img className="img-fluid img-thumbnail h-100" src={thumbnailPreviewUrl} />);
      }
      let type = <PostType updateParent={this.updateParent} type={this.state.type} reward={this.state.reward}/>;
      let description = <Description updateParent={this.updateParent} text={this.state.description}/>;
      let title = <Title updateParent={this.updateParent} text={this.state.title}/>;
      let loader = this.state.loader ? <div className="loader"/> : null;
      return (
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
              <div>Quel est le type d'annonce que vous voulez poster ?</div>
                {type}
                <br/>
                {title}
                <br/>
                {description}
              <div className="row justify-content-start">
                <div className="form-group col-3">
                  <label>Ajoutez une image de l'objet</label>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" onChange={this.handleThumbnail} />
                </div>
                {$thumbnailPreview}
                <div className="form-group col-3">
                  <label>Ajoutez des images supplémentaires si possible</label>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" onChange={this.handleImage} multiple/>
                </div>
              </div>
              <br/>
              <button className="btn btn-primary" onCLick={() => this.handleSubmit()}>Update</button>{loader}

          </form>
        </div>)}
        else{return (<div></div>)}


   }
}


export default CreatePost;
