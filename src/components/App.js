import Clock from'./Clock/Clock.js';
import inputs from './Inputs/Inputs.js';
import React from 'react';
import Settings from './Settings/Settings.js';
import Help from './Help/Help.js';
import Toolbar from './Toolbar/Toolbar.js';
import PianoRoll from './PianoRoll/PianoRoll.js';
import Tabs from './Tabs/Tabs.js';
import Pane from './Pane/Pane.js';
import Beat from './Beat/Beat.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTool = this.toggleTool.bind(this);
        this.changeTempo = this.changeTempo.bind(this);
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
        inputs.bind();
        this.pianoRoll = PianoRoll(this.refs.pianoroll);
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

        // this.clock.setTempo(value);
    }

    toggleTool(tool) {
        if (this.state.activeTool === tool) {
            this.setState({activeTool: null});
            return;
        }

        this.setState({activeTool: tool});
    }

    render() {
        const {tempo, activeTool, tools} = this.state;

        return (
            <div className="app">
                <div className="app__window">
                    <Tabs selected={0}>
                        <Pane label="Lead Improv">
                            <div ref={"pianoroll"} id="piano-roll"></div>
                        </Pane>
                        <Pane label="Beat">
                            <Beat />
                        </Pane>
                    </Tabs>
                </div>
                <Clock tempo={this.state.tempo} />
                <Toolbar tools={tools} activeTool={activeTool} toggleTool={this.toggleTool} />
                <Settings isOpen={activeTool === 'settings'} changeTempo={this.changeTempo} tempo={tempo} />
                <Help isOpen={activeTool === 'help'} />
            </div>
        );
    }
}

export default App;
