import React, { Component } from 'react';
import Form from '../form/form'
import './app.scss'
import BeamPreview from '../beam_preview/beam_preview';
import Charts from '../charts/charts';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getState = (data) => {
    // console.log(data);

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
      <div className="appContainer">
        <Form getState={this.getState} />
        <BeamPreview
          numOfForces={this.state.numOfForces}
          beamLength={this.state.beamLength}
          force1X={this.state.force_1_X}
          force2X={this.state.force_2_X}
          force1Val={this.state.force_1_Value}
          force2Val={this.state.force_2_Value}
        />
        <Charts
          numOfForces={this.state.numOfForces}
          beamLength={this.state.beamLength}
          force1X={this.state.force_1_X}
          force2X={this.state.force_2_X}
          force1Val={this.state.force_1_Value}
          force2Val={this.state.force_2_Value}
        />
      </div>
    )
  }
}

export default App;