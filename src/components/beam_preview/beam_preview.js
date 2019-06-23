import React, { Component } from 'react'
import './beam_preview.scss';
import '../../assets/variables.scss';

class BeamPreview extends Component {

  render() {
    // console.log(this.props);
    // let { numOfForces, force1X, force2X, force1Val, force2Val } = this.props;
    let previewWidth = 800;
    let previewWindowStyle = { width: `${previewWidth}px` }
    let forces = [];

    for (let i = 1; i <= this.props.numOfForces; i++) {

      let forceXcoordinate = (this.props[`force${i}X`] / this.props.beamLength) * previewWidth;
      let showDimensionLine = forceXcoordinate >= 100;
      let forceClass = this.props[`force${i}Val`] < 0 ? `forceContainer__force force_${i} negative` : `forceContainer__force force_${i}`
      let forcesRenderCondition = this.props.numOfForces > 0;
      let forceStyle = {
        width: forceXcoordinate,
        height: `${130 + (i - 1) * 60}px`,
        borderRight: showDimensionLine ? "2px solid black" : "0 solid black"
      }

      if ((this.props[`force${i + 1}X`] !== undefined && this.props[`force${i}X`] <= this.props[`force${i + 1}X`]) || (this.props[`force${i + 1}X`] === undefined && this.props[`force${i}X`] >= this.props[`force${i - 1}X`])) {
        forces.push(
          <>
            {forcesRenderCondition &&
              <div className="forceContainer" style={forceStyle}>
                {
                  showDimensionLine &&
                  <div className="beamContainer__dimensionArrow"><strong>{this.props[`force${i}X`]} mm </strong></div>

                }
                {/* <div className={`forceContainer__force force_${i}`}> */}
                <div className={forceClass}>

                  <div className={`forceContainer__badge no${i}`}>Force {i}</div>
                </div>
              </div>
            }
          </>
        )
      }
    }
    let lengthRenderCondition = (this.props.beamLength > 0);
    return (
      <>
        <div className="beamPreview">
          <h2 className="beamPreview__header">BEAM PREVIEW</h2>
          <div className="beamContainer"
            style={previewWindowStyle}>
            <div className="beamContainer__dimensionArrow">
              {lengthRenderCondition ? (<strong>{this.props.beamLength} mm</strong>) : ""}
            </div>
            {forces}
            <div className="beamContainer__beam"></div>
          </div>
        </div>
      </>
    )
  }
}

export default BeamPreview




