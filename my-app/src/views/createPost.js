import React, { Component } from 'react';




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
      }
      else if (type === "secondary") {

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


export default class CreatePost extends Component {
  state = {
    type:"search"
  }

  handleSubmit(event) {
    console.log(event.target);
  }

  handleChange(event) {

  }

  render () {
      let post = PostType;
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>Quel est le type d'annonce que vous voulez poster ?</div>
              <PostType/>
            <br/>
            <div className="form-group">
              <textarea className="form-control" placeholder="Entrez une description brève de l'objet"></textarea>
            </div>
            <div className="form-group">
              <label >Ajoutez une image si possible</label>
              <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
   }
}
