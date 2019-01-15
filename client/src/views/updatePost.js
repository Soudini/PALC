import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
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
    let options = {search:"Annonce recherche", found:"Annonce trouvaille"}
    let opt = [];
    for (let i in options){
      if (i == this.props.text){
        opt.push(<option active="True" key={i}>{options[i]}</option>);
      }
      else{
        opt.push(<option key={i}>{options[i]}</option>);
      }
    }
    console.log(opt);
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
    console.log(this.props.text)
    return (<div className="form-group">
      <textarea className="form-control" placeholder="Entrez une description brève de l'objet" onChange={this.handleChange}>{this.props.text}</textarea>
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
      <input className="form-control" placeholder="Entrez le titre de votre annonce" onChange={this.handleChange}>{this.props.text}</input>
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
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);

    this.handleThumbnail = this.handleThumbnail.bind(this);
  }


  componentDidMount() {this.searchDataFromDb()}

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  }

  updateParent(key, value) {
    this.setState({[key]: value})
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
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        let dataurl = canvas.toDataURL("image/jpeg");
        this.setState({thumbnailPreviewUrl:dataurl});}
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

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = infos => {
    const fd = new FormData();
    if (this.state.image)
    {
      fd.append('image', this.state.image, this.state.image.name)
    }
    axios.post("/api/putData", {
      author : cookies.get("firstName") + " " + cookies.get("lastName"),
      author_id : cookies.get("id"),
      title: infos.title,
      type: infos.type,
      reward: this.state.reward,
      description: infos.description,
      thumbnail: infos.thumbnailPreviewUrl,
      image: infos.image,
    });
    console.log({
      author : cookies.get("firstName") + " " + cookies.get("lastName"),
      author_id : cookies.get("id"),
      title: infos.title,
      image: infos.image,
      type: infos.type,
      reward: this.state.reward,
      description: infos.description,
    });
  };

  handleUpdate =()=> {

      axios.post("/api/updateData", {id :this.props.match.params.id });

  }

  searchDataFromDb = () => {
    axios.post("/api/searchById", {id :this.props.match.params.id })
      .then(data => data.data).then(res => {for (let i in res.data) {this.setState({i: res.data[i]})}});
  };

  render () {
      let {thumbnailPreviewUrl} = this.state;
      let $thumbnailPreview = null;
      if (thumbnailPreviewUrl) {
        $thumbnailPreview = (<img className="img-fluid img-thumbnail w-25 h-25" src={thumbnailPreviewUrl} />);
      }
      console.log(this.state)
      let type = <PostType updateParent={this.updateParent} text={this.state.type}/>;
      let description = <Description updateParent={this.updateParent} text={this.state.description}/>;
      let title = <Title updateParent={this.updateParent} text={this.state.title}/>;
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
              <button type="submit" className="btn btn-primary">Update</button>

          </form>
        </div>

      )
   }
}


export default CreatePost;
