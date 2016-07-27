import _ from 'lodash';
import Scale from './Model/Scale.js';
import Player from '../Player/Player.js';

const key = 'C';

class Lead {
    constructor() {
        this.scale = Scale.get('diatonic', {
            name: key,
            octave: 3
        });
        this.player = new Player();
        this.currentIndex = 7;
        this.noteName = this.scale[this.currentIndex];
    }

    next() {
        if (this.percentChance(20)) {
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
        const newNote = this.scale[this.currentIndex];
        this.noteName = newNote.name + newNote.octave;

        this.player.triggerNote('on', this.noteName);
    }

    stop() {
        this.player.triggerNote('off', this.noteName);
    }
}

export default Lead;
