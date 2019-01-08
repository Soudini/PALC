import React, { Component } from 'react';
import axios from "axios";

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



export default class CreatePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type:"search",
      reward: "Palc",
      title: null,
      description: null,
      image: null,
      data: [],
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }


  componentDidMount() {
  }

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

  handleImage(event) {
    var reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e) => {

        var img = new Image();
        img.src = e.target.result;
        img.onload = () => {var canvas = document.createElement("canvas");
          console.log(img.src)
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
          this.setState({imagePreviewUrl:dataurl});
          console.log(dataurl)}
    }
    reader.readAsDataURL(file);

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
      author : "TODO", //TODO
      title: infos.title,
      type: infos.type,
      reward: this.state.reward,
      description: infos.description,
      image: infos.imagePreviewUrl,
    });
    console.log({
      author : "TODO", //TODO
      title: infos.title,
      image: infos.image,
      type: infos.type,
      reward: this.state.reward,
      description: infos.description,
    });
  };


  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  render () {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img className="img-fluid img-thumbnail w-25 h-25" src={imagePreviewUrl} />);
      }
      let type = <PostType updateParent={this.updateParent}/>;
      let description = <Description updateParent={this.updateParent}/>;
      let title = <Title updateParent={this.updateParent}/>;
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
                  <label>Ajoutez une image si possible</label>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" onChange={this.handleImage} />
                </div>
                {$imagePreview}
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">Submit</button>

          </form>
        </div>

      )
   }
}
