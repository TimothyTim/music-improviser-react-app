function MyPolySynth(context) {
    this.context = context;
    this.osc = {};
    this.oscGain = {};
    this.oscillators = [];
    this.attackTime = 10;
    this.releaseTime = 200;
    this.masterVolume = 20;
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
    const releaseTime = this.releaseTime / 1000;
    const currTime = this.context.currentTime;

    //Decay
    this.oscGain[note.name].gain.setValueAtTime(
        this.noteGainOnAttack,
        currTime
    );
    this.oscGain[note.name].gain.linearRampToValueAtTime(
        0,
        currTime + releaseTime
    );

    delete this.oscGain[note.name];

    console.log(this.oscGain);
};

MyPolySynth.prototype.stopAll = function() {
    const releaseTime = this.releaseTime / 1000;
    const currTime = this.context.currentTime;

    for (let note in this.oscGain) {
        this.oscGain[note].gain.linearRampToValueAtTime(
            0,
            currTime + releaseTime
        );

        this.osc[note].stop(0);

        delete this.oscGain[note];
    }
};

export default MyPolySynth;
