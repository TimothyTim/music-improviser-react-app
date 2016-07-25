import Clock from'./Clock/Clock.js';
import inputs from './Inputs/Inputs.js';
import React from 'react';
import Settings from './Settings/Settings.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.clock = null;
        this.togglePlay = this.togglePlay.bind(this);
        this.changeTempo = this.changeTempo.bind(this);
        this.state = {
            isPlaying: false,
            tempo: 60
        };
    }

    componentDidMount() {
        this.clock = new Clock(this.state.tempo);
        inputs.bind();
    }

    changeTempo(e) {
        this.clock.setTempo(e.currentTarget.value);
    }

    togglePlay() {
        if (this.state.isPlaying) {
            this.clock.stop();
        } else {
            this.clock.start();
        }

        this.setState({isPlaying: !this.state.isPlaying});
    }

    render() {
        const {isPlaying, tempo} = this.state;
        const playIconClass = isPlaying ? 'pause' : 'play';

        return (
            <div className="app">
                <div className="main">
                    <button className="main__start" onClick={this.togglePlay}>
                        <i className={`fa fa-${playIconClass}-circle`} aria-hidden="true"></i>
                    </button>
                </div>

                <Settings changeTempo={this.changeTempo} tempo={tempo} />
            </div>
        );
    }
}

export default App;
