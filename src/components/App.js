import $ from 'jquery';
import Clock from'./Clock/Clock.js';
import inputs from './Inputs/Inputs.js';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.clock = null;
        this.bindEvents = this.bindEvents.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.state = {
            isPlaying: false
        }
    }

    componentDidMount() {
        const $page = $('#page');
        const $tempo = $page.find('.tempo');
        this.clock = new Clock($tempo.val());
        inputs.bind();
        this.bindEvents();
    }

    bindEvents() {
        $('.tempo').on('change', (e) => {
            this.clock.setTempo(e.currentTarget.value);
        });
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
        const {isPlaying} = this.state;
        const playIconClass = isPlaying ? 'pause' : 'play';

        return (
            <div className="app">
                <div className="main">
                    <button className="main__start" onClick={this.togglePlay}>
                        <i className={`fa fa-${playIconClass}-circle`} aria-hidden="true"></i>
                    </button>
                </div>
                <div className="settings hide">
                    <div>
                        <h2>Master settings</h2>
                        <label>Tempo: </label>
                        <input type="number" min="0" max="200" value="60" className="tempo" /><br />
                    </div>
                    <div>
                        <h2>Synth Settings</h2>
                        <label>Volume: </label>
                        <input type="range" min="0" max="80" value="20" className="slider" /><br />
                        <label>Attack Time (ms): </label>
                        <input type="number" min="0" max="3000" value="10" className="attackTime" /><br />
                        <label>Release Time (ms): </label>
                        <input type="number" min="0" max="3000" value="100" className="releaseTime" /><br />
                        <h3>Midi Input Device: </h3>
                        <table id="midi_source">
                            <tr>
                                <td>Name</td>
                                <td className="name"></td>
                            </tr>
                            <tr>
                                <td>Manufacturer</td>
                                <td className="manufacturer"></td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td className="state"></td>
                            </tr>
                        </table>
                        <div id="key_data"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
