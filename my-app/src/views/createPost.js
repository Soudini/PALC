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
        this.props.updateParent("type", event.target.value === "Annonce recherche"? "search":"found")
      }
      else if (type === "secondary") {
        this.props.updateParent("reward", event.target.value)
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


export default class CreatePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type:"search",
      reward:null,
      description: null,
    }

    this.updateParent = this.updateParent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  updateParent(key, value) {
    this.setState({[key]: value})
  }

  handleSubmit(event) {

  }

  render () {
      let type = <PostType updateParent={this.updateParent}/>;
      let description = <Description updateParent={this.updateParent}/>;
      return (
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
              <div>Quel est le type d'annonce que vous voulez poster ?</div>
                {type}
                <br/>
                {description}
              <div className="form-group">
                <label>Ajoutez une image si possible</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
   }
}
