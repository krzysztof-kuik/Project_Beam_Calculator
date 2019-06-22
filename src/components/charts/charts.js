import React, { Component } from 'react'
import './charts.scss';
import { LineChart, Line } from 'recharts';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactionA: 0,
      reactionB: 0
    }
  }

  dataProcessor = () => {
    let { numOfForces, beamLength, force1X, force2X, force1Val, force2Val } = this.props;
    let { reactionA, reactionB } = this.state;
    let firstSectionData = {};
    console.log((force1X / 10).toFixed(1));

    for (let i = 0.0; parseFloat((i).toFixed(1)) <= force1X; i += parseFloat((force1X / 10).toFixed(1))) {

      let index = parseFloat((i).toFixed(1));
      firstSectionData[index] = reactionA * i;
    }
    console.log(firstSectionData);

    let border = numOfForces < 2 ? beamLength : force2X;

    for (let i = parseFloat(force1X); parseFloat((i).toFixed(1)) <= border; i += parseFloat(((border - force1X) / 10).toFixed(1))) {

      console.log(i);

      let index = parseFloat((i).toFixed(1));
      firstSectionData[index] = reactionA * i - force1Val * (i - force1X);
    }
    console.log(firstSectionData);


  }

  reactionsCalc = () => {
    let { beamLength, force1X, force2X, force1Val, force2Val } = this.props;
    console.log(beamLength);

    let reactionA = (force1Val * (beamLength - force1X) + force2Val * (beamLength - force2X)) / beamLength;

    let reactionB = (force1Val * force1X + force2Val * force2X) / beamLength;

    this.setState({
      reactionA: reactionA,
      reactionB: reactionB
    }, this.dataProcessor)
  }

  render() {
    console.log(this);
    // console.log(this.props);
    return (
      <section className="chartsSection">
        <button onClick={this.reactionsCalc}>RESOLVE</button>
        <div className="chartsContainer">
          <LineChart
            width="400" height="200"
          >

          </LineChart>
        </div>
      </section>
    )
  }
}

export default Charts;