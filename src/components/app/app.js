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

  }

  render() {
    return (
      <>
        <Form getState={this.getState} />
        <BeamPreview
          numOfForces={this.state.numOfForces}
          forceX1={this.state.force_1_X}
          forceX2={this.state.force_2_X}
          forceVal1={this.state.force_1_Value}
          forceVal2={this.state.force_2_Value}
        />
      </>
    )
  }
}

export default App;