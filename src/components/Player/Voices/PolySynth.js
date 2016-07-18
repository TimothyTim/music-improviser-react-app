import $ from 'jquery';
import Tone from 'tone';

function PolySynth(context) {
    this.synth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();

    this.context = context;
    this.attackTime = $('.attackTime');
    this.releaseTime = $('.releaseTime');
    this.masterVolume = $('.slider');
}

PolySynth.prototype.start = function(note) {
    const masterVol = this.masterVolume.val() / 100;
    const attackTime = this.attackTime.val() / 1000;
    const releaseTime = this.releaseTime.val() / 1000;
    const now = this.context.currentTime;
    const noteGain = note.gain * masterVol;

    this.synth.set({
        "envelope": {
            "attack": attackTime,
            "release": releaseTime
        }
    });

    this.synth.triggerAttack(note.name, now, noteGain);
};

PolySynth.prototype.stop = function(note) {
    this.synth.triggerRelease(note.name);
};

export default PolySynth;
