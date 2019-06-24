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
			reactionB: 0,
			solved: false,
		}
		this.signleForceCondtition = false;
		this.doubleForceCondtition = false;
		this.buttonActive = false;
	}

	dataPreprocessor = () => {
		let { numOfForces, beamLength, force1X, force2X, force1Val, force2Val } = this.props;
		let { reactionA, reactionB } = this.state;
		let calcPoints = [0, beamLength];
		let torqueData = [];
		let cuttingForceData = [];
		let sortCalcPoints = () => {
			return calcPoints.sort((a, b) => a - b);
		}
		console.log((force1X / 10).toFixed(1));

		if (numOfForces < 2) {
			calcPoints.push(force1X);
			sortCalcPoints();
			for (let i = 0; i < 2; i++) {
				torqueData.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i]).toFixed(1))
					}
				)
				cuttingForceData.push(
					{
						x: calcPoints[i],
						cutForce: i === 0 ? 0 : reactionA
					},
					{
						x: calcPoints[i],
						cutForce: i === 0 ? reactionA : reactionA - force1Val
					}
				)
			}
			for (let i = 2; i < calcPoints.length; i++) {
				torqueData.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X)).toFixed(1))
					}
				)

				cuttingForceData.push(
					{
						x: calcPoints[i],
						cutForce: reactionA - force1Val
					},
					{
						x: calcPoints[i],
						cutForce: 0
					}
				)
			}
		} else {

			calcPoints.push(force1X, force2X);
			sortCalcPoints();
			for (let i = 0; i < 2; i++) {
				torqueData.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i]).toFixed(1))
					}
				)
				cuttingForceData.push(
					{
						x: calcPoints[i],
						cutForce: i === 0 ? 0 : reactionA,
						a: 1
					},
					{
						x: calcPoints[i],
						cutForce: i === 0 ? reactionA : reactionA - force1Val,
						b: 2
					}
				)
			}
			for (let i = 1; i < 3; i++) {

				torqueData.push(
					{
						x: calcPoints[i],
						torque: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X)).toFixed(1))
					}
				)

			}
			for (let i = 2; i < calcPoints.length; i++) {

				cuttingForceData.push(
					{
						x: calcPoints[i],
						cutForce: i === calcPoints.length - 1 ? reactionA - force1Val - force2Val : reactionA - force1Val,
						c: 3
					},
					{
						x: calcPoints[i],
						cutForce: i === calcPoints.length - 1 ? 0 : reactionA - force1Val - force2Val,
						d: 4
					}
				)
			}
			for (let i = 2; i < calcPoints.length; i++) {

				torqueData.push({
					x: calcPoints[i],
					torque: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X) - force2Val * (calcPoints[i] - force2X)).toFixed(1))
				})
			}

		}

		console.log(torqueData, cuttingForceData);
		this.setState({
			torqueData: torqueData,
			cuttingForceData: cuttingForceData
		})


	}

	clickHandler = () => {

		let { numOfForces, beamLength, force1X, force2X, force1Val, force2Val } = this.props;
		console.log(beamLength);

		let reactionA = (force1Val * (beamLength - force1X) + force2Val * (beamLength - force2X)) / beamLength;

		let reactionB = (force1Val * force1X + force2Val * force2X) / beamLength;

		// let signleForceCondtition = beamLength * force1Val * force1X !== 0;
		// let doubleForceCondtition = beamLength * force1Val * force1X * force2Val * force2X !== 0;

		if ((numOfForces === 1 && this.signleForceCondtition) || (numOfForces > 1 && this.doubleForceCondtition)) {
			console.log('ok');

			this.setState({
				reactionA: reactionA,
				reactionB: reactionB,
				solved: this.buttonActive ? true : false

			}, this.dataPreprocessor)

		}
	}





	render() {

		this.signleForceCondtition = ((this.props.beamLength * this.props.force1Val) === 0) || isNaN(this.props.beamLength * this.props.force1Val) ? false : true;

		this.doubleForceCondtition = ((this.props.beamLength * this.props.force1Val * this.props.force2Val) === 0) || isNaN(this.props.beamLength * this.props.force1X * this.props.force2X) ? false : true;

		this.buttonActive = ((this.props.numOfForces === 1 & this.signleForceCondtition) || (this.props.numOfForces === 2 && this.doubleForceCondtition)) ? true : false;

		console.log("forse 1 condition:", this.signleForceCondtition);
		console.log("forse 1 condition:", this.doubleForceCondtition);
		console.log("button activ:", this.buttonActive);

		let buttonClass = this.buttonActive ? "solveButton" : "solveButton disabled";
		let chartsSectionClass = this.state.solved ? "chartsSection visible" : "chartsSection hidden";
		// console.log(this.props);
		return (
			<>
				<button className={buttonClass} onClick={this.clickHandler}><span>SOLVE</span></button>
				<section className="chartsComponent">
					<div className={chartsSectionClass}>
						<div className="chartsContainer">
							<LineChart
								width={880} height={400} data={this.state.torqueData}
								margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="x"
									type="number"
									tickCount={5}
									scale="linear"
									interval={0}
									domain={[0, this.state.beamLength]}
									// label="x [mm]"
									tick={{ fontSize: 18 }}
									dy={10}
								/>
								<YAxis
									dataKey="torque"
									type="number"
									tickCount={5}
									scale="linear"
									domain={['dataMin', 'dataMax']}
									interval={0}
									allowDecimals={true}
									// label="Torque [Nmm]"
									angle={-45}
									dx={-5}
									textAnchor="end"
									tick={{ fontSize: 18 }}
								/>
								<Tooltip />
								<Legend />
								<Line type="linear" dataKey="torque" stroke="#8884d8" activeDot={{ r: 8 }} stroke="rgb(121, 121, 121)" strokeWidth="3" />
							</LineChart>


							<LineChart
								width={880} height={400} data={this.state.cuttingForceData}
								margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="x"
									type="number"
									tickCount={5}
									scale="linear"
									interval={0}
									domain={[0, this.state.beamLength]}
									// label="x [mm]"
									tick={{ fontSize: 18 }}
									dy={10}
									minTickGap={0}
								// allowDataOverflow={false}


								/>
								<YAxis
									dataKey="cutForce"
									interval={0}
									type="number"
									tickCount={5}
									scale="linear"
									domain={[dataMin => (1.1 * dataMin), dataMax => (1.1 * dataMax)]}

									// domain={[' 1.1 * dataMin', '1.1 * dataMax']}
									allowDecimals={true}
									// label="Torque [Nmm]"	
									angle={-45}
									dx={-5}
									textAnchor="end"
									tick={{ fontSize: 18 }}

								/>
								<Tooltip />
								<Legend />
								<Line type="linear" dataKey="cutForce" stroke="#8884d8" activeDot={{ r: 8 }} stroke="rgb(121, 121, 121)" strokeWidth="3" />
							</LineChart>
						</div>
					</div>
				</section>
			</>
		)
	}
}

export default Charts;