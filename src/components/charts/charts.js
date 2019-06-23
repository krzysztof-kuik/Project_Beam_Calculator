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
		let calcPoints = [0, beamLength];
		let data = [];
		let sortCalcPoints = () => {
			return calcPoints.sort((a, b) => a - b);
		}
		console.log((force1X / 10).toFixed(1));

		if (numOfForces < 2) {
			calcPoints.push(force1X);
			sortCalcPoints();
			for (let i = 0; i < 2; i++) {
				data.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i]).toFixed(1))
					}
				)
			}
			for (let i = 2; i < calcPoints.length; i++) {
				data.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X)).toFixed(1))
					}
				)
			}
		} else {

			calcPoints.push(force1X, force2X);
			sortCalcPoints();
			for (let i = 0; i < 2; i++) {
				data.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i]).toFixed(1))
					}
				)
			}
			for (let i = 1; i < 3; i++) {

				data.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X)).toFixed(1))
					}
				)
			}
			for (let i = 2; i < calcPoints.length; i++) {

				data.push({
					x: calcPoints[i],
					torque: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X) - force2Val * (calcPoints[i] - force2X)).toFixed(1))
				})
			}

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
						margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="x" type="number" tickCount={10} scale="linear" domain={[0, this.state.beamLength]} unit="mm" />>
							<YAxis dataKey="torque" type="number" tickCount={5} scale="linear" domain={['dataMin', 'dataMax']} interval={0} allowDecimals={true} />
						<Tooltip />
						<Legend />
						<Line type="linear" dataKey="torque" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				</div>
			</section>
		)
	}
}

export default Charts;