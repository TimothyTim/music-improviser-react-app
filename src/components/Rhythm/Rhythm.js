import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rhythmActions from '../Actions/rhythmActions';
import _ from 'lodash';
import Lead from './Lead.js';
import Player from '../Player/Player.js';
import Chord from './Model/Chord.js';
import chordSequence from './Model/ChordSequences.js';

class RhythmMaker extends React.Component {
    constructor(props) {
        super(props);
        this.currentBeat = null;
        this.currentChord = null;
        this.setupSequence();
        this.snapShot = null;
        this.player = null;

        this.next = this.next.bind(this);
    }

    componentDidMount() {
        this.snapShot = _.get(this.props, 'clock.nextTick');
        this.player = new Player();
    }

    componentDidUpdate(prevProps) {
        if (_.isEqual(prevProps.clock.nextTick, this.props.clock.nextTick)) {
            return ;
        }

        if (!this.props.clock.isTicking) {
            this.props.actions.isCountIn({isCountIn: true});
            this.stopChords();
            this.next();
        }

        console.log(this.props.clock.nextTick);
    }

    next() {
        let {barIndex, beatIndex, subBeatIndex} = _.get(this, 'snapShot');
        this.currentBeat = this.props.clock.nextTick;
        const nextBarIndex = this.currentBeat.barIndex;
        const nextBeatIndex = this.currentBeat.beatIndex;
        const nextSubBeatIndex = this.currentBeat.subBeatIndex;

        if (!_.isEqual(this.snapShot, this.currentBeat)) {
            // each bar
            if (barIndex !== nextBarIndex) {
                if (!this.props.rhythm.isCountIn) {
                    this.nextBar();
                }
            }

            // each beat
            if (beatIndex !== nextBeatIndex && this.props.rhythm.isCountIn) {
                if (this.props.rhythm.isCountIn && nextBarIndex === 4 && nextBeatIndex === 4) {
                    this.props.actions.isCountIn({isCountIn: false});
                }
            }

            if (subBeatIndex !== nextSubBeatIndex && !this.props.rhythm.isCountIn) {
                // each sub-beat
                this.nextSubBeat();
            }

            this.snapShot = this.currentBeat;
        } else {
            console.error('duplicate beats triggered');
        }
    }

    nextBar() {
        console.log("PLAYING CHORD");
        // iterate through chord sequence
        if (this.props.clock.isTicking) {
            this.playNextChord();
        }
    }

    nextSubBeat() {
        if (this.isCurrentChordFinished()) {
            this.stopCurrentChord();
        }
    }

    isCurrentChordFinished() {
        let isFinished;

        if (this.currentChord && this.currentChord.endPoint) {
            isFinished = _.isEqual(this.currentBeat, this.currentChord.endPoint);
        }

        return isFinished;
    }

    playNextChord() {
        // Current chord in sequence
        let thisChordObject = this.sequenceEntries.next();

        // Reset sequence (probably a bad way of doing it)
        if (thisChordObject.done) {
            this.setupSequence();
            thisChordObject = this.sequenceEntries.next();
        }

        let thisChord = thisChordObject.value[1];

        // setup chord instance that can be interacted with
        this.currentChord = new Chord(thisChord, _.cloneDeep(this.currentBeat));
        this.player.trigger('on', this.currentChord.getNotes(true), 'myPolySynth');
    }

    stopCurrentChord() {
        this.player.trigger('off', this.currentChord.getNotes(false), 'myPolySynth');
        this.currentChord = null;
    }

    stopChords() {
        if (this.currentChord) {
            this.stopCurrentChord();
            this.setupSequence();
        }
    }

    setupSequence() {
        this.sequenceEntries = chordSequence.sequence1.entries();
        // this.sequenceEntries = chordSequence.sequence1;
    }

    reset(rhythmicPosition) {
        console.log("reset");
        this.props.actions.isCountIn({isCountIn: true});
        this.snapShot = rhythmicPosition;
    }

    render() {
        return (
            <div>
                <Lead />
            </div>
        );
    }
}

RhythmMaker.propTypes = {
    clock: PropTypes.object.isRequired,
    rhythm: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        clock: state.clock,
        rhythm: state.rhythm
    };
}

function mapDispatchToProps(dispatch) {
    // defines what actions are avaiable in the Component

    return {
        actions: bindActionCreators(rhythmActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RhythmMaker);
