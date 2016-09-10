import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// import Lead from './Lead.js';
import Player from '../Player/Player.js';
import Chord from './Model/Chord.js';
import chordSequence from './Model/ChordSequences.js';

class RhythmMaker extends React.Component {
    constructor(props) {
        super(props);
        this.currentBeat = null;
        this.countIn = true;
        this.currentChord = null;
        this.setupSequence();
        this.snapShot = null;
        this.player = null;

        this.next = this.next.bind(this);
    }

    componentDidMount() {
        this.snapShot = _.get(this.props, 'clock.nextTick');
        this.player = new Player();

        // this.lead = new Lead();
    }

    componentDidUpdate(prevProps) {
        if (_.isEqual(prevProps.clock.nextTick, this.props.clock.nextTick)) {
            return ;
        }

        if (!this.isTicking) {
            this.stopChords();
        }

        console.log(this.props.clock.nextTick);
        this.next();
    }

    next() {
        this.currentBeat = this.props.clock.nextTick;
        let {barIndex, beatIndex, subBeatIndex} = _.get(this, 'snapShot');
        const nextBarIndex = this.currentBeat.barIndex;
        const nextBeatIndex = this.currentBeat.beatIndex;
        const nextSubBeatIndex = this.currentBeat.subBeatIndex;

        if (!_.isEqual(this.snapShot, this.currentBeat)) {

            if (barIndex !== nextBarIndex) {
                // each bar
                if (this.countIn && nextBarIndex === 1) {
                    this.countIn = false;
                }

                if (!this.countIn) {
                    this.nextBar();
                }
            }

            if (beatIndex !== nextBeatIndex) {
                // each beat
                if (this.countIn) {
                    this.nextCountInBeat();
                }
            }

            if (subBeatIndex !== nextSubBeatIndex && !this.countIn) {
                // each sub-beat
                this.nextSubBeat();
            }

            this.snapShot = this.currentBeat;
        } else {
            console.error('duplicate beats triggered');
        }
    }

    nextBar() {
        // iterate through chord sequence
        if (this.isCurrentChordFinished()) {
            this.playNextChord();
        }
    }

    nextSubBeat() {
        if (this.isCurrentChordFinished()) {
            this.stopCurrentChord();
        }
        // this.lead.next();
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

        // this.lead.stop();
    }

    setupSequence() {
        this.sequenceEntries = chordSequence.sequence1.entries();
        // this.sequenceEntries = chordSequence.sequence1;
    }

    reset(rhythmicPosition) {
        this.countIn = true;
        this.snapShot = rhythmicPosition;
    }

    nextCountInBeat() {

    }

    render() {
        return (
            <div></div>
        );
    }
}

RhythmMaker.propTypes = {
    clock: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {clock: state.clock};
}

export default connect(mapStateToProps)(RhythmMaker);
