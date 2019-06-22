import React, { Component } from 'react'
import './form.scss';
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

  forceInputHandler = (e, i) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    }, () => { this.props.getState(this.state) }
    )
  }

  xCoordInputHandler = (e, i) => {
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

      if (parseInt(this.state[`force_${i - 1}_X`]) > parseInt(this.state[`force_${i}_X`])) {
        errorInfo.push(
          <div className="errorAlert">
            Value of Force {i} should be greater than Force {i - 1}
          </div>
        )
      }
      forceForms.push(

        <div className="form__forceInput">
          <h4 className="form__badge">Force {i} : </h4>
          <label className="form__forceInput-forceValue">
            <span> value </span>
            <input onChange={this.forceInputHandler} name={`force_${i}_Value`} type="number" value={this.state[`force_${i}_Value`]} />
            [N]
          </label>

          <label className="form__forceInput-forceX">
            <span> x-coordinate </span>
            <input onChange={e => this.xCoordInputHandler(e, i)} name={`force_${i}_X`} type="number" value={xCoordValue} min={minXValue} max={maxValue} />
            [mm]
          </label>
        </div>
      )

    }

    return (
      <form className="form">
        <div className="form__container">

          <label className="form__lengthInput">
            <h4 className="form__badge">Beam length : </h4>
            <input className="form__beamlengthInput" onChange={this.lengthHandler} name="beamLength" type="number" min="0" value={this.state.beamLength} />
            [mm]
          </label>

          <div className="form__numOfForcesInput">
            <h4 className="form__badge">Number of forces : </h4>
            <div class="form__numOfForcesInput-options">

              <label className="form__numOfForcesInput-option1">
                <input type="radio" name="numOfForces" value="1" onChange={this.radioHandler} /> 1
                        </label>
              <label className="form__numOfForcesInput-option2">
                <input type="radio" name="numOfForces" value="2" onChange={this.radioHandler} /> 2
                        </label>
            </div>
          </div>
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