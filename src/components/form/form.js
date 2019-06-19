import React, { Component } from 'react'

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beamLength: 0,
      numOfForces: 0,
    }
  }

  radioHandler = (e) => {
    this.setState({
      numOfForces: parseInt(e.target.value),
    })
  }

  numInputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

    this.props.getState(e);
  }

  render() {
    console.log(this.props);
    let forceForms = [];
    for (let i = 1; i <= this.state.numOfForces; i++) {
      let minXValue = i >= 2 ? parseInt(this.state[`force_${i - 1}_X`]) + 1 : 0;
      forceForms.push(
        <div>
          <label> Please specify value of Force Number {i}
            <input onChange={this.numInputHandler} name={`force_${i}_Value`} type="number" value={this.state[`force_${i}_Value`]} />
          </label>
          <label> Please specify x coordinate of Force Number {i}
            <input onChange={this.numInputHandler} name={`force_${i}_X`} type="number" value={this.state[`force_${i}_X`]} min={minXValue} />
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