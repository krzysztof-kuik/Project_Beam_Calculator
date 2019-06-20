import React, { Component } from 'react'
import './beam_preview.scss';


class BeamPreview extends Component {
    render() {
        console.log(this.props);

        return (
            <>
                <h2>BEAM PREVIEW</h2>
                <div className="beamPreview">
                    <div className="beamContainer">
                        <div className="beamContainer__force"></div>
                        <div className="beamContainer__beam"></div>


                    </div>
                </div>
            </>
        )
    }
}

export default BeamPreview
