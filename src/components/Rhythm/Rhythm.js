import _ from 'lodash';
import Lead from './Lead.js';
import Player from '../Player/Player.js';
import Chord from './Model/Chord.js';
import chordSequence from './Model/ChordSequences.js';

class RhythmMaker {
    constructor(snapShot) {
        let _this = this;
        this.snapShot = snapShot;
        this.currentBeat = null;
        this.countIn = true;
        this.player = new Player();
        this.lead = new Lead();
        this.currentChord = null;
        this.setupSequence();

        this.player.loadMulti(['/public/audio/kick.wav', '/public/audio/snap.wav'], function(bufferList) {
            _this.kick = bufferList[0];
            _this.snap = bufferList[1];
        });
    }

    next(beatObject) {
        this.currentBeat = beatObject;
        let {countIn, snapShot, currentBeat} = this;
        const {barIndex, beatIndex, subBeatIndex} = snapShot;
        const {nextBarIndex, nextBeatIndex, nextSubBeatIndex} = currentBeat;

        if (!_.isEqual(snapShot, currentBeat)) {
            console.log(currentBeat);

            if (barIndex !== nextBarIndex) {
                // each bar
                if (countIn && nextBarIndex === 1) {
                    countIn = false;
                }

                if (!countIn) {
                    this.nextBar();
                }
            }

            if (beatIndex !== nextBeatIndex) {

                // each beat
                if (!countIn) {
                    this.nextBeat();
                } else {
                    this.nextCountInBeat();
                }
            }

            if (subBeatIndex !== nextSubBeatIndex && !countIn) {
                // each sub-beat
                // Maybe bass line
                this.nextSubBeat();
            }

            snapShot = currentBeat;
        } else {
            console.log('duplicate beats triggered');
        }
    }

    nextBar() {
        // iterate through chord sequence
        this.playNextChord();
    }

    nextBeat() {
        this.player.play(this.kick);
    }

    nextSubBeat() {
        if (this.isCurrentChordFinished()) {
            this.stopCurrentChord();
        }

        this.lead.next();
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
        this.countIn = true;
        this.snapShot = rhythmicPosition;
    }

    nextCountInBeat() {
        this.player.play(this.snap);
    }
}

export default RhythmMaker;
