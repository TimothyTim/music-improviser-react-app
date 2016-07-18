import _ from 'lodash';
import Player from '../Player/Player.js';
import Chord from './Model/Chord.js';
import chordSequence from './Model/ChordSequences.js';

class RhythmMaker {
    constructor(snapShot, context) {
        let _this = this;
        this.context = context;
        this.snapShot = snapShot;
        this.currentBeat = null;
        this.countIn = true;
        this.player = new Player();
        this.currentChord = null;
        this.setupSequence();

        this.player.loadMulti(['/public/audio/kick.wav', '/public/audio/snap.wav'], function(bufferList) {
            _this.kick = bufferList[0];
            _this.snap = bufferList[1];
        });
    }

    next(beatObject) {
        this.currentBeat = beatObject;

        if (!_.isEqual(this.snapShot, this.currentBeat)) {
            console.log(this.currentBeat);

            if (this.snapShot.barIndex !== this.currentBeat.barIndex) {
                // each bar
                if (this.countIn && this.currentBeat.barIndex === 1) {
                    this.countIn = false;
                }

                if (!this.countIn) {
                    this.nextBar();
                }
            }

            if (this.snapShot.beatIndex !== this.currentBeat.beatIndex) {

                // each beat
                if (!this.countIn) {
                    this.nextBeat();
                } else {
                    this.nextCountInBeat();
                }
            }

            if (this.snapShot.subBeatIndex !== this.currentBeat.subBeatIndex && !this.countIn) {
                // each sub-beat
                // Maybe bass line
                this.nextSubBeat();
            }

            this.snapShot = this.currentBeat;
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
