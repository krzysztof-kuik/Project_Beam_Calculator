import React, { Component } from 'react';
import Form from '../form/form'
import BeamPreview from '../beam_preview/beam_preview';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getState = (data) => {
    console.log(data);

    for (let i = 0; i < Object.keys(data).length; i++) {
      let key = Object.keys(data)[i];
      let value = data[key];
      this.setState({
        [key]: value
      })
    }

    // let newState = data
    // this.setState({
    //   newState
    // })
    // const target = data.target;
    // this.setState({
    //   [target.name]: target.value
    // })
  }

  render() {
    return (
      <>
        <Form getState={this.getState} />
        <BeamPreview />
      </>
    )
  }
}

export default App;