import React, { Component } from 'react';
import Form from '../form/form'
import BeamPreview from '../beam_preview/beam_preview';

class App extends Component {
    render() {
        return (
            <>
                <Form />
                <BeamPreview />
            </>
        )
    }
}

export default App;