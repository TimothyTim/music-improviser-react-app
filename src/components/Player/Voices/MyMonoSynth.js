import $ from 'jquery';

function MonoSynth(context) {
    this.context = context;
    this.osc = this.context.createOscillator();
    // this.osc.type = this.osc.SINE;
    this.osc.start(0);

    this.oscGain = this.context.createGain();
    this.oscGain.gain.value = 0;

    this.osc.connect(this.oscGain);
    this.oscGain.connect(this.context.destination);

    this.notesPlaying = {};
    this.attackTime = $('.attackTime');
    this.masterVolume = $('.slider');
}

MonoSynth.prototype.isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
};

MonoSynth.prototype.start = function(note) {
    const masterVolume = this.masterVolume.val() / 100;
    const noteGain = note.gain * masterVolume;

    this.notesPlaying[note.frequency] = true;
    this.osc.frequency.value = note.frequency;

    this.oscGain.gain.value = noteGain;
};

MonoSynth.prototype.stop = function(note) {
    delete this.notesPlaying[note.frequency];
    if (this.isEmpty(this.notesPlaying)) {
        this.oscGain.gain.value = note.gain;
    }
};

MonoSynth.prototype.stopNotes = function() {
    this.osc.stop(0);
    this.osc = null;
};

export default MonoSynth;
