import _ from 'lodash';
import Musie from 'musie';
import Player from '../Player/Player.js';

class Lead {
    constructor(bps) {
        this.scale = Musie.get('C5', 'major');
        console.log(this.scale);
        this.player = new Player();
        this.currentIndex = 3;
        this.noteName = this.scale[this.currentIndex].name;
        this.bps = bps;
        this.stopped = false;
        this.pushPull = 200;
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
        this.player.triggerNote('on', newNote.name);
        this.player.triggerNote('off', _.clone(newNote.name), this.noteDuration());
    }

    noteDuration() {
        return (this.bps*1000) * 2 + this.pushPull;
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
