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
    const target = data.target;
    this.setState({
      [target.name]: target.value
    })
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