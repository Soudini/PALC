import React, { Component } from 'react';

export default class Ad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      value: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    this.props.updateParent("title", event.target.value)
  }

  render() {
    return (<div className="card" style={{"margin-top": "20px"}}>
              <div className="card-body">
                <h5 className="card-title">{this.props.data.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.data.author + (this.props.data.reward ? " offre "+ this.props.data.reward: "")}</h6>
                <p className="card-text">{this.props.data.description}</p>
                <div>
                  <img src={this.props.data.image} />
                </div>
              </div>
            </div>
    )
  }
}
