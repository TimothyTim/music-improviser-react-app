import _ from 'lodash';
import Lead from './Lead.js';
import Player from '../Player/Player.js';
import Chord from './Model/Chord.js';
import chordSequence from './Model/ChordSequences.js';

class RhythmMaker {
    constructor(snapShot, bps) {
        let _this = this;
        this.snapShot = snapShot;
        this.currentBeat = null;
        this.countIn = true;
        this.player = new Player();
        this.lead = new Lead(bps);
        this.currentChord = null;
        this.setupSequence();
        this.updateTempo(bps);

        this.player.loadMulti(['/public/audio/kick.wav', '/public/audio/snap.wav'], function(bufferList) {
            _this.kick = bufferList[0];
            _this.snap = bufferList[1];
        });
    }

    next(beatObject) {
        this.currentBeat = beatObject;
        let {barIndex, beatIndex, subBeatIndex} = this.snapShot;
        const nextBarIndex = this.currentBeat.barIndex;
        const nextBeatIndex = this.currentBeat.beatIndex;
        const nextSubBeatIndex = this.currentBeat.subBeatIndex;

        console.log(beatIndex, nextBeatIndex);

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
                if (!this.countIn) {
                    this.nextBeat();
                } else {
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

        this.lead.stop();
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

    updateTempo(bps) {
        this.bps = bps;
        this.lead.updateTempo(this.bps);
    }
}

export default RhythmMaker;
