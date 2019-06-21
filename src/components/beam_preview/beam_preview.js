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

            let forceStyle = {
                width: this.props[`force${i}X`],
                height: `${130 + (i - 1) * 60}px`,
                borderRight: this.props[`force${i}X`] >= 60 ? "2px solid black" : "0 solid black"
            }

            if ((this.props[`force${i + 1}X`] !== undefined && this.props[`force${i}X`] <= this.props[`force${i + 1}X`]) || (this.props[`force${i + 1}X`] === undefined && this.props[`force${i}X`] >= this.props[`force${i - 1}X`])) {
                forces.push(
                    <>
                        <div className="forceContainer" style={forceStyle}>
                            {
                                this.props[`force${i}X`] >= 60 &&
                                <div className="beamContainer__dimensionArrow">{this.props[`force${i}X`]}</div>

                            }
                            <div className="forceContainer__force">
                                <div className={`forceContainer__badge no${i}`}>Force {i}</div>
                            </div>
                        </div>
                    </>
                )
            }
        }

        return (
            <>
                <h2>BEAM PREVIEW</h2>
                <div className="beamPreview">
                    <div className="beamContainer"
                        style={previewWindowStyle}>
                        <div className="beamContainer__dimensionArrow">Beam length: {this.props.beamLength}</div>
                        {forces}
                        <div className="beamContainer__beam"></div>


                    </div>
                </div>
            </>
        )
    }
}

export default BeamPreview
