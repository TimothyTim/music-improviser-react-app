import _ from 'lodash';
import RhythmMaker from '../Rhythm/Rhythm.js';

const rhythm = {
    beatsInBar: 4,
    beatSubDivs: 4
};
const rhythmicPosition = {
    barIndex: 3, //count in
    beatIndex: rhythm.beatsInBar,
    subBeatIndex: rhythm.beatSubDivs
};

class Clock {
    constructor(tempo) {
        this.isTicking = false;
        this.beatPerSecond = 60 / tempo;
        this.rhythm = {
            beatsInBar: 4,
            beatSubDivs: 4
        };
        this.barGroup = 4;
        this.rhythmicPosition = _.cloneDeep(rhythmicPosition);
        this.nextNoteTime = 0;
        this.startTime = 0; // not necessarily needed
        this.frame = null;
        this.context = new AudioContext();
        this.rhythmMaker = new RhythmMaker(_.cloneDeep(this.rhythmicPosition));
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
        cancelAnimationFrame(this.frame);
        this.isTicking = false;
    }

    stop() {
        cancelAnimationFrame(this.frame);
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
        this.beatPerSecond = 60 / newTempo;
    }

    isTicking() {
        return this.isTicking;
    }

    schedule() {
        while (this.nextNoteTime <= (this.context.currentTime - this.startTime)) {
            this.tick();

            // Needs to sit after tick so that snapshot will have updated
            this.rhythmMaker.next(_.cloneDeep(this.rhythmicPosition));
            // Improvise(); // calls Player for audio and Draw for visuals
        }
        this.frame = requestAnimationFrame(this.schedule.bind(this)); // call for next sub beat
    }

    tick() {
        this.nextNoteTime += (1 / this.rhythm.beatSubDivs) * this.beatPerSecond;

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
}

export default Clock;
