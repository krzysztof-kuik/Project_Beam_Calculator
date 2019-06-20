import React, { Component } from 'react'
import './beam_preview.scss';


class BeamPreview extends Component {
    render() {
        // console.log(this.props);
        // let { numOfForces, force1X, force2X, force1Val, force2Val } = this.props;
        let forces = [];
        for (let i = 1; i <= this.props.numOfForces; i++) {

            let forceStyle = {
                width: this.props[`force${i}X`]
            }

            if ((this.props[`force${i + 1}X`] !== undefined && this.props[`force${i}X`] <= this.props[`force${i + 1}X`]) || (this.props[`force${i + 1}X`] === undefined && this.props[`force${i}X`] >= this.props[`force${i - 1}X`])) {
                forces.push(
                    <>
                        <div className="forceContainer" style={forceStyle}>
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
                    <div className="beamContainer">

                        {forces}
                        <div className="beamContainer__beam"></div>


                    </div>
                </div>
            </>
        )
    }
}

export default BeamPreview
