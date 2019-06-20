import React, { Component } from 'react'

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beamLength: 0,
      numOfForces: 0,

      force_1_Value: 0,
      force_2_Value: 0,
      force_1_X: 0,
      force_2_X: 0
    }
  }

  radioHandler = (e) => {
    this.setState({
      numOfForces: parseInt(e.target.value),
    }, () => { this.props.getState(this.state) })
  }

  numInputHandler = (e, i) => {
    let nEl = parseInt(this.state[`force_${i}_X`]);
    let nPlusOneEl = parseInt(this.state[`force_${i + 1}_X`]);

    if (nPlusOneEl - nEl <= 0) {

      this.setState({
        [e.target.name]: parseInt(e.target.value),
        [`force_${i + 1}_X`]: parseInt(e.target.value) + 1,
      }, () => { this.props.getState(this.state) })
    }
    else {
      this.setState({
        [e.target.name]: parseInt(e.target.value),
      }, () => { this.props.getState(this.state) })
    }
  }


  render() {

    let forceForms = [];
    for (let i = 1; i <= this.state.numOfForces; i++) {

      let minXValue = i >= 2 ? parseInt(this.state[`force_${i - 1}_X`]) + 1 : 0;

      forceForms.push(

        <div>
          <label> Please specify value of Force Number {i}
            <input onChange={this.numInputHandler} name={`force_${i}_Value`} type="number" value={this.state[`force_${i}_Value`]} />
          </label>

          <label> Please specify x coordinate of Force Number {i}
            <input onChange={e => this.numInputHandler(e, i)} name={`force_${i}_X`} type="number" value={this.state[`force_${i}_X`]} min={minXValue} />
          </label>
        </div>
      )
    }

    return (
      <form>
        <label> Please specify beam length
            <input onChange={this.numInputHandler} name="beamLength" type="number" min="0" value={this.state.beamLength} />
        </label>
        <div>
          Please specify number of forces
                    <label>
            <input type="radio" name="numOfForces" value="1" onChange={this.radioHandler} />
            1
                    </label>
          <label>
            <input type="radio" name="numOfForces" value="2" onChange={this.radioHandler} />
            2
                    </label>
        </div>

        {this.state.numOfForces > 0 &&
          forceForms
        }

      </form>
    )
  }
}

export default Form;