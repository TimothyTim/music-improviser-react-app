import _ from 'lodash';
import Scale from './Model/Scale.js';
import Player from '../Player/Player.js';

const key = 'C';

class Lead {
    constructor(bps) {
        this.scale = Scale.get('diatonic', {
            name: key,
            octave: 3
        });
        this.player = new Player();
        this.currentIndex = 7;
        this.noteName = this.scale[this.currentIndex];
        this.bps = bps;
        this.stopped = false;
    }

    next() {
        if (this.percentChance(80)) {
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
        const maxIndexJump = 4;
        const randIndex = Math.round(rand * maxIndexJump);

        return randIndex;
    }

    playNote() {
        this.stopped = false;
        const newNote = this.scale[this.currentIndex];
        const _this = this;
        this.noteName = newNote.name + newNote.octave;

        this.player.triggerNote('on', this.noteName);

        setTimeout(() => {
            if (!_this.stopped) {
                _this.stop();
            }
        }, this.noteDuration());
    }

    noteDuration() {
        return (this.bps*1000) / 5; //less than a semi tone
    }

    stop() {
        this.player.triggerNote('stop');
        this.stopped = true;
    }

    updateTempo(bps) {
        this.bps = bps;
    }
}

export default Lead;
