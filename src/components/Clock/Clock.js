import React, {PropTypes} from 'react';
import _ from 'lodash';
import RhythmMaker from '../Rhythm/Rhythm.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as clockActions from '../Actions/clockActions';

// import PianoRoll from '../PianoRoll/PianoRoll.js';

const rhythm = {
    beatsInBar: 4,
    beatSubDivs: 4
};
const rhythmicPosition = {
    barIndex: 3, //count in
    beatIndex: rhythm.beatsInBar,
    subBeatIndex: rhythm.beatSubDivs
};

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.isTicking = false;
        this.bps = 60 / this.props.tempo;
        this.rhythm = {
            beatsInBar: 4,
            beatSubDivs: 4
        };
        this.barGroup = 4;
        this.rhythmicPosition = _.cloneDeep(rhythmicPosition);
        this.nextNoteTime = 0;
        this.startTime = 0; // not necessarily needed
        this.context = null;
        this.rhythmMaker = new RhythmMaker(_.cloneDeep(this.rhythmicPosition));
        this.state = {
            frame: null,
            rhythmicPos: null,
            ticking: false
        };

        this.togglePlay = this.togglePlay.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidUpdate() {
        console.log(this.props.clock.nextTick);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown, false);
        this.context = new AudioContext();
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
            this.setState({ticking: false});
            this.stop();
        } else {
            this.setState({ticking: true});
            this.start();
        }

        this.setState({isPlaying: !this.state.isPlaying});
    }

    start() {
        if (!this.isTicking) {
            if (this.isFromBeginning()) {
                this.startTime = this.context.currentTime;
            }

            this.schedule();
            this.isTicking = true;
        }
    }

    pause() {
        cancelAnimationFrame(this.state.frame);
        this.isTicking = false;
    }

    stop() {
        cancelAnimationFrame(this.state.frame);
        this.rhythmMaker.stopChords();
        this.reset();
    }

    reset() {
        this.isTicking = false;
        this.nextNoteTime = 0;
        this.rhythmicPosition = _.cloneDeep(rhythmicPosition);
        this.rhythmMaker.reset(_.cloneDeep(this.rhythmicPosition));
    }

    setTempo(newTempo) {
        this.bps = 60 / newTempo;
    }

    isTicking() {
        return this.isTicking;
    }

    schedule() {
        console.log(this.nextNoteTime, this.context.currentTime, this.startTime);
        while (this.nextNoteTime <= (this.context.currentTime - this.startTime)) {
            this.tick();

            this.props.actions.nextTick({nextTick: Object.assign({}, this.rhythmicPosition)});

            // Needs to sit after tick so that snapshot will have updated
            // this.rhythmMaker.next(_.cloneDeep(this.rhythmicPosition));
        }

        // PianoRoll().draw();

        this.setState({
            frame: requestAnimationFrame(this.schedule.bind(this))
        });
    }

    tick() {
        this.nextNoteTime += (1 / this.rhythm.beatSubDivs) * this.bps;

        if (++this.rhythmicPosition.subBeatIndex > this.rhythm.beatSubDivs) {
            this.rhythmicPosition.subBeatIndex = 1;

            if (++this.rhythmicPosition.beatIndex > this.rhythm.beatsInBar) {
                this.rhythmicPosition.beatIndex = 1;

                if (++this.rhythmicPosition.barIndex > this.barGroup) {
                    this.rhythmicPosition.barIndex = 1;
                }
                // BAR
            }
            // BEAT
        }
        // SUB-BEAT
    }

    isFromBeginning() {
        return this.nextNoteTime === 0;
    }

    render() {
        const {ticking} = this.state
        const playClass = ticking ? 'pause' : 'play';
        const mainActive = ticking ? 'active' : '';

        return (
            <div className="clock">
              <div className="clock__controls">
                  <button className={`clock__controls__start ${mainActive}`} onClick={this.togglePlay}>
                      <i className={`fa fa-${playClass}-circle`} aria-hidden="true"></i>
                  </button>
              </div>
            </div>
        );
    }
}

Clock.propTypes = {
    tempo: PropTypes.number.isRequired
};


function mapStateToProps(state) {
    return {
        clock: state.clock
    };
}

function mapDispatchToProps(dispatch) {
    // defines what actions are avaiable in the Component

    return {
        actions: bindActionCreators(clockActions, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clock);
