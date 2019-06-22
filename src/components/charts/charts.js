import React, { Component } from 'react'
import './charts.scss';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Charts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reactionA: 0,
			reactionB: 0
		}
	}

	dataPreprocessor = () => {
		let { numOfForces, beamLength, force1X, force2X, force1Val, force2Val } = this.props;
		let { reactionA, reactionB } = this.state;
		let data = [];
		console.log((force1X / 10).toFixed(1));

		for (let i = 0.0; parseFloat((i).toFixed(1)) < force1X; i += parseFloat((force1X / 10).toFixed(1))) {
			let index = parseFloat((i).toFixed(1));

			data.push(
				{
					x: index,
					torque: parseFloat((reactionA * i).toFixed(1))
				}
			)
			// data[index] = parseFloat((reactionA * i).toFixed(1));
		}
		console.log(data);

		let border = numOfForces < 2 ? beamLength : force2X;

		for (let i = parseFloat(force1X); parseFloat((i).toFixed(1)) <= border; i += parseFloat(((border - force1X) / 10).toFixed(1))) {

			console.log(i);

			let index = parseFloat((i).toFixed(1));

			data.push(
				{
					x: index,
					torque: parseFloat((reactionA * i - force1Val * (i - force1X)).toFixed(1))
				}
			)
			// data[index] = parseFloat((reactionA * i - force1Val * (i - force1X)).toFixed(1));
		}
		console.log(data);
		this.setState({
			data: data
		})


	}

	reactionsCalc = () => {
		let { beamLength, force1X, force2X, force1Val, force2Val } = this.props;
		console.log(beamLength);

		let reactionA = (force1Val * (beamLength - force1X) + force2Val * (beamLength - force2X)) / beamLength;

		let reactionB = (force1Val * force1X + force2Val * force2X) / beamLength;

		this.setState({
			reactionA: reactionA,
			reactionB: reactionB
		}, this.dataPreprocessor)
	}

	render() {
		console.log(this);
		// console.log(this.props);
		return (
			<section className="chartsSection">
				<button onClick={this.reactionsCalc}>RESOLVE</button>
				<div className="chartsContainer">
					<LineChart
						width={860} height={400} data={this.state.data}
						margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="x" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="torque" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				</div>
			</section>
		)
	}
}

export default Charts;