import React, { Component } from 'react'
import './charts.scss';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
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
		let momentData = [];
		let shearForceData = [];
		let sortCalcPoints = () => {
			return calcPoints.sort((a, b) => a - b);
		}
		console.log((force1X / 10).toFixed(1));

		if (numOfForces < 2) {
			calcPoints.push(force1X);
			sortCalcPoints();
			for (let i = 0; i < 2; i++) {
				momentData.push(
					{
						x: calcPoints[i],
						moment: parseFloat((reactionA * calcPoints[i]).toFixed(1))
					}
				)
				shearForceData.push(
					{
						x: calcPoints[i],
						shearForce: i === 0 ? 0 : reactionA
					},
					{
						x: calcPoints[i],
						shearForce: i === 0 ? reactionA : reactionA - force1Val
					}
				)
			}
			for (let i = 2; i < calcPoints.length; i++) {
				momentData.push(
					{
						x: calcPoints[i],
						moment: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X)).toFixed(1))
					}
				)

				shearForceData.push(
					{
						x: calcPoints[i],
						shearForce: reactionA - force1Val
					},
					{
						x: calcPoints[i],
						shearForce: 0
					}
				)
			}
		} else {

			calcPoints.push(force1X, force2X);
			sortCalcPoints();
			for (let i = 0; i < 2; i++) {
				momentData.push(
					{
						x: calcPoints[i],
						moment: parseFloat((reactionA * calcPoints[i]).toFixed(1))
					}
				)
				shearForceData.push(
					{
						x: calcPoints[i],
						shearForce: i === 0 ? 0 : reactionA,
						a: 1
					},
					{
						x: calcPoints[i],
						shearForce: i === 0 ? reactionA : reactionA - force1Val,
						b: 2
					}
				)
			}
			for (let i = 1; i < 3; i++) {

				momentData.push(
					{
						x: calcPoints[i],
						moment: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X)).toFixed(1))
					}
				)

			}
			for (let i = 2; i < calcPoints.length; i++) {

				shearForceData.push(
					{
						x: calcPoints[i],
						shearForce: i === calcPoints.length - 1 ? reactionA - force1Val - force2Val : reactionA - force1Val,
						c: 3
					},
					{
						x: calcPoints[i],
						shearForce: i === calcPoints.length - 1 ? 0 : reactionA - force1Val - force2Val,
						d: 4
					}
				)
			}
			for (let i = 2; i < calcPoints.length; i++) {

				momentData.push({
					x: calcPoints[i],
					moment: parseFloat((reactionA * calcPoints[i] - force1Val * (calcPoints[i] - force1X) - force2Val * (calcPoints[i] - force2X)).toFixed(1))
				})
			}

		}

		console.log(momentData, shearForceData);
		this.setState({
			momentData: momentData,
			shearForceData: shearForceData
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
							<div className="chartContainer__title"> Moment
								<div className="chartContainer__unitX"> x [mm]</div>
								<div className="chartContainer__unitY">M [Nmm]</div>
							</div>
							<AreaChart
								width={878} height={400} data={this.state.momentData}
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
									dataKey="moment"
									type="number"
									tickCount={5}
									scale="linear"
									domain={['dataMin', 'dataMax']}
									interval={0}
									allowDecimals={true}
									// label="moment [Nmm]"
									angle={-45}
									dx={-5}
									textAnchor="end"
									tick={{ fontSize: 18 }}
								/>
								<Tooltip />
								{/* <Legend /> */}
								<Area type="linear" dataKey="moment" stroke="#8884d8" activeDot={{ r: 8 }} stroke="rgb(121, 121, 121)" strokeWidth="3" fill='rgb(235, 235, 235)' />
							</AreaChart>

							<div className="chartContainer__title"> Shear Force
								<div className="chartContainer__unitX">x [mm]</div>
								<div className="chartContainer__unitY">F [N]</div>
							</div>

							<AreaChart
								width={878} height={400} data={this.state.shearForceData}
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
									dataKey="shearForce"
									interval={0}
									type="number"
									tickCount={5}
									scale="linear"
									domain={[dataMin => (1.1 * dataMin), dataMax => (1.1 * dataMax)]}

									// domain={[' 1.1 * dataMin', '1.1 * dataMax']}
									allowDecimals={true}
									// label="moment [Nmm]"	
									angle={-45}
									dx={-5}
									textAnchor="end"
									tick={{ fontSize: 18 }}

								/>
								<Tooltip />
								{/* <Legend /> */}
								<Area type="linear" dataKey="shearForce" stroke="#8884d8" fill='rgb(235, 235, 235)' activeDot={{ r: 8 }} stroke="rgb(121, 121, 121)" strokeWidth="3" />
							</AreaChart>
						</div>
					</div>
				</section>
			</>
		)
	}
}

export default Charts;