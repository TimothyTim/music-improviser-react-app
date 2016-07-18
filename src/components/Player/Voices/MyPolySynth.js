import $ from 'jquery';

function MyPolySynth(context) {
    this.context = context;
    this.osc = {};
    this.oscGain = {};
    this.oscillators = [];
    this.attackTime = $('.attackTime');
    this.releaseTime = $('.releaseTime');
    this.masterVolume = $('.slider');
}

MyPolySynth.prototype.start = function(note) {
    const masterVolume = this.masterVolume.val() / 100;
    const noteGain = note.gain * masterVolume;
    const currTime = this.context.currentTime;
    const attackTime = this.attackTime.val() / 1000;

    this.noteGainOnAttack = noteGain; // for linear rampdown

    /* VCO */
    this.osc[note.name] = this.context.createOscillator();
    this.osc[note.name].type = 'sine';
    this.osc[note.name].frequency.value = note.frequency;

    this.oscGain[note.name] = this.context.createGain();
    this.oscGain[note.name].gain.setValueAtTime(0, currTime);
    this.oscGain[note.name].gain.linearRampToValueAtTime(noteGain, currTime + attackTime);

    this.osc[note.name].connect(this.oscGain[note.name]);
    this.oscGain[note.name].connect(this.context.destination);
    this.osc[note.name].start(0);
};

MyPolySynth.prototype.stop = function(note) {
    const releaseTime = this.releaseTime.val() / 1000;
    const currTime = this.context.currentTime;

    //Decay
    this.oscGain[note.name].gain.setValueAtTime(
        this.noteGainOnAttack,
        currTime
    );
    this.oscGain[note.name].gain.linearRampToValueAtTime(
        note.gain,
        currTime + releaseTime
    );

    // clean up
    // setTimeout(function() {
    //     _this.osc[note.name].stop(0);
    //     _this.osc[note.name] = null;
    //     _this.oscGain[note.name] = null;
    // }, this.decayTime+1);
};

export default MyPolySynth;
