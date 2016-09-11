import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as leadActions from '../Actions/leadActions';
import _ from 'lodash';
import Musie from 'musie';
import Player from '../Player/Player.js';
// import PianoRoll from '../PianoRoll/PianoRoll.js';

class Lead extends React.Component {
    constructor(props) {
        super(props);
        this.scale = Musie.get('C4', 'major');
        this.currentIndex = 3;
        this.player = null;
        this.noteName = this.scale[this.currentIndex].name;
        this.stopped = false;
        this.pushPull = 200;
        this.notesPlayed = [];
    }

    componentDidMount() {
        this.player = new Player();
    }

    componentDidUpdate(prevProps) {
        // if (_.isEqual(prevProps.clock.nextTick, this.props.clock.nextTick)) {
        //     return ;
        // }

        if (this.props.clock.isTicking && this.props.clock.nextTick.subBeatIndex !== prevProps.clock.nextTick.subBeatIndex && !this.props.rhythm.isCountIn) {
            this.next();
        }

        if (!this.props.clock.isTicking) {
            this.stop();
        }
    }

    next() {
        if (this.percentChance(40)) {
            this.calculateNewNoteIndex();
            this.playNote();
        }
    }

    calculateNewNoteIndex() {
        let currentIndex = _.clone(this.currentIndex);
        const jumpIndexBy = this.randomIndex();

        if (this.randomBool()) {
            currentIndex += jumpIndexBy;
        } else {
            currentIndex -= jumpIndexBy;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex >= this.scale.length){
            currentIndex = this.scale.length - 1;
        }

        this.currentIndex = currentIndex;
    }

    randomNumber() {
        return Math.random();
    }

    randomBool() {
        return Math.round(this.randomNumber());
    }

    percentChance(percent) {
        return (this.randomNumber() * 100) < percent ? true : false;
    }

    randomIndex() {
        const rand = this.randomNumber();
        const maxIndexJump = 2;
        const randIndex = Math.round(rand * maxIndexJump);

        return randIndex;
    }

    playNote() {
        this.stopped = false;
        const newNote = this.scale[this.currentIndex];
        const duration = this.noteDuration();

        if (this.props.clock.isTicking) {
            this.player.triggerNote('on', newNote.name);
            this.player.triggerNote('off', newNote.name, this.noteDuration());

            this.notesPlayed.push(newNote.name);

            this.props.actions.leadNoteList({leadNoteList: _.clone(this.notesPlayed)});
            this.props.actions.leadNote({leadNote: {
                newNote: newNote,
                duration: duration
            }});
        }
    }

    noteDuration() {
        return (this.props.clock.tempo / 60) * 2 + this.pushPull;
    }

    stop() {
        this.player.triggerNote('stop');
        this.stopped = true;
    }

    render() {
        return (
            <div></div>
        );
    }
}

Lead.propTypes = {
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
        actions: bindActionCreators(leadActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
