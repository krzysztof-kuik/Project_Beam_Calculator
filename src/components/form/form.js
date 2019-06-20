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

  lengthHandler = (e) => {

    let xCoordinates = Object.keys(this.state).filter(element => {
      return (element.includes("force") && element.includes("X"))
    })
    console.log(xCoordinates);

    for (let i = 0; i < xCoordinates.length; i++) {
      const element = xCoordinates[i];
      if (parseInt(e.target.value) <= parseInt(this.state[element])) {
        this.setState({
          [element]: parseInt(e.target.value),
        }, () => { this.props.getState(this.state) })
      }

    }

    if (e.target.value.length === 0) {
      console.log("war 3");

      this.setState({
        [e.target.name]: 0,
      }, () => { this.props.getState(this.state) })

      for (let i = 0; i < Object.keys(this.state).length; i++) {
        let element = Object.keys(this.state)[i];

        if (element.includes('force')) {
          this.setState({
            [element]: 0,
          }, () => { this.props.getState(this.state) })
        }

      }
    }


    else {
      this.setState({
        [e.target.name]: parseInt(e.target.value),
      }, () => { this.props.getState(this.state) })
    }
  }

  numInputHandler = (e, i) => {
    let nMinusOneEl = parseInt(this.state[`force_${i - 1}_X`])
    let nEl = parseInt(this.state[`force_${i}_X`]);
    let nPlusOneEl = parseInt(this.state[`force_${i + 1}_X`]);
    let maximum = this.state.beamLength;

    console.log(e.target.value);
    console.log(typeof e.target.value);
    console.log(e.target.value.length);

    if (e.target.value.length === 0) {
      console.log("war 3");

      this.setState({
        [e.target.name]: 0,
      }, () => { this.props.getState(this.state) })
    }

    else if (nPlusOneEl - nEl <= 0 && e.target.value < maximum) {
      console.log("war 1");

      this.setState({
        [e.target.name]: parseInt(e.target.value),
        [`force_${i + 1}_X`]: parseInt(e.target.value) + 1,
      }, () => { this.props.getState(this.state) })

    }

    else if (e.target.value <= maximum) {
      console.log("war 2");

      this.setState({
        [e.target.name]: parseInt(e.target.value),
      }, () => { this.props.getState(this.state) })
    }


  }


  render() {

    let forceForms = [];
    let errorInfo = [];
    for (let i = 1; i <= this.state.numOfForces; i++) {

      let minXValue = i >= 2 ? parseInt(this.state[`force_${i - 1}_X`]) + 0 : 0;

      let maxValue = this.state.beamLength;
      let xCoordValue = this.state[`force_${i}_X`] <= maxValue ? this.state[`force_${i}_X`] : maxValue;

      forceForms.push(

        <div>
          <label> Please specify value of Force Number {i}
            <input onChange={this.numInputHandler} name={`force_${i}_Value`} type="number" value={this.state[`force_${i}_Value`]} />
          </label>

          <label> Please specify x coordinate of Force Number {i}
            <input onChange={e => this.numInputHandler(e, i)} name={`force_${i}_X`} type="number" value={xCoordValue} min={minXValue} max={maxValue} />
          </label>
        </div>
      )

      if (parseInt(this.state[`force_${i - 1}_X`]) > parseInt(this.state[`force_${i}_X`])) {
        errorInfo.push(
          <div>
            Value of Force {i} should be greater than Force {i - 1}
          </div>
        )
      }
    }

    return (
      <form>
        <label> Please specify beam length
            <input onChange={this.lengthHandler} name="beamLength" type="number" min="0" value={this.state.beamLength} />
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

        {(this.state.numOfForces > 0 && this.state.beamLength > 0) &&
          forceForms
        }
        {errorInfo}

      </form>
    )
  }
}

export default Form;