// import $ from 'jquery';
// import Tone from 'tone';
//
// function PolySynth(context) {
//     this.synth = new Tone.PolySynth(8, Tone.SimpleSynth).set({
// 			"volume" : -8,
// 			"oscillator" : {
// 				"type" : "sine6"
// 			},
// 			"envelope" : {
// 				"attack" :  0.015,
// 				"decay" :  0.25,
// 				"sustain" :  0.08,
// 				"release" :  0.5
// 			}
// 		}).toMaster();
//
//         this.synth.stealVoices = true;
//
//     this.context = context;
//     this.attackTime = $('.attackTime');
//     this.releaseTime = $('.releaseTime');
//     this.masterVolume = $('.slider');
// }
//
// PolySynth.prototype.startStop = function(note) {
//     const masterVol = this.masterVolume.val() / 100;
//     const attackTime = this.attackTime.val() / 1000;
//     const releaseTime = this.releaseTime.val() / 1000;
//     const noteGain = note.gain * masterVol;
//
//     this.synth.set({
//         "envelope": {
//             "attack": attackTime,
//             "release": releaseTime
//         }
//     });
//
//     // duration = Math.max(duration, 0.2);
//     this.synth.triggerAttackRelease(note.name, 1, undefined, noteGain);
// };
//
// PolySynth.prototype.start = function(note) {
//     const masterVol = this.masterVolume.val() / 100;
//     const attackTime = this.attackTime.val() / 1000;
//     const releaseTime = this.releaseTime.val() / 1000;
//     // const now = this.context.currentTime;
//     const noteGain = note.gain * masterVol;
//
//     this.synth.set({
//         "envelope": {
//             "attack": attackTime,
//             "release": releaseTime
//         }
//     });
//
//     this.synth.triggerAttack(note.name, undefined, noteGain);
// };
//
// PolySynth.prototype.stop = function(note) {
//     this.synth.triggerRelease(note.name);
// };
//
// PolySynth.prototype.stopAll = function () {
//     this.synth.releaseAll();
// };
//
// export default PolySynth;
