import Clock from'./Clock/Clock.js';
import inputs from './Inputs/Inputs.js';
import React from 'react';
import Settings from './Settings/Settings.js';
import Help from './Help/Help.js';
import Toolbar from './Toolbar/Toolbar.js';
import PianoRoll from './PianoRoll/PianoRoll.js';
import Tabs from './Tabs/Tabs.js';
import Pane from './Pane/Pane.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.clock = null;
        this.togglePlay = this.togglePlay.bind(this);
        this.toggleTool = this.toggleTool.bind(this);
        this.changeTempo = this.changeTempo.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            isPlaying: false,
            tempo: 60,
            activeTool: null,
            tools: [
                {
                    name: 'settings',
                    icon: 'cog'
                },
                {
                    name: 'help',
                    icon: 'question-circle'
                }
            ]
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown, false);
        this.clock = Clock(this.state.tempo);
        inputs.bind();
        this.pianoRoll = PianoRoll(document.getElementById('piano-roll'));
    }

    changeTempo(e) {
        const upperLimit = 200;
        const lowerLimit = 40;
        let {value} = e.currentTarget;

        if (value < lowerLimit) {
            value = lowerLimit;
        } else if (value > upperLimit) {
            value = upperLimit;
        }

        this.clock.setTempo(value);
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.which;
        const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
        if (isInsideInput) {
            return;
        }

        if (keyCode === 32) {
            e.preventDefault();
            this.togglePlay();
        }
        if (keyCode === 27) {
            e.preventDefault();
            this.toggleTool(null);
        }
    }

    togglePlay() {
        if (this.state.isPlaying) {
            this.clock.stop();
        } else {
            this.clock.start();
        }

        this.setState({isPlaying: !this.state.isPlaying});
    }

    toggleTool(tool) {
        if (this.state.activeTool === tool) {
            this.setState({activeTool: null});
            return;
        }

        this.setState({activeTool: tool});
    }



    render() {
        const {isPlaying, tempo, activeTool, tools} = this.state;
        const playClass = isPlaying ? 'pause' : 'play';
        const mainActive = isPlaying ? 'active' : '';

        return (
            <div className="app">
                <div className="app__window">
                    <Tabs selected={0}>
                        <Pane label="Tab 1">
                            <div id="piano-roll"></div>
                        </Pane>
                        <Pane label="Tab 2">
                            <div id="sequencer"></div>
                        </Pane>
                    </Tabs>
                </div>
                <div className="app__controls">
                    <button className={`app__controls__start ${mainActive}`} onClick={this.togglePlay}>
                        <i className={`fa fa-${playClass}-circle`} aria-hidden="true"></i>
                    </button>
                </div>
                <Toolbar tools={tools} activeTool={activeTool} toggleTool={this.toggleTool} />
                <Settings isOpen={activeTool === 'settings'} changeTempo={this.changeTempo} tempo={tempo} />
                <Help isOpen={activeTool === 'help'} />
            </div>
        );
    }
}

export default App;
