import _ from 'lodash';
import MyMonoSynth from './Voices/MyMonoSynth.js';
import PolySynth from './Voices/PolySynth.js';
import MyPolySynth from './Voices/MyPolySynth.js';
import BufferLoader from '../../utils/BufferLoader.js';
import music from '../../utils/Music.js';

class Player {
    constructor() {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        this.context = context;
        this.leadSynth = null;
        this.initSynths();
    }

    initSynths() {
        this.myMonoSynth = new MyMonoSynth(this.context);
        this.myPolySynth = new MyPolySynth(this.context);
        this.polySynth = new PolySynth(this.context);
    }

    load(url, cb) {
        let request = new XMLHttpRequest();
        let _this = this;
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
            _this.context.decodeAudioData(request.response, function(buffer) {
                cb(buffer);
            });
        };
        request.send();
    }

    loadMulti(audioFiles, cb) {
        this.bufferLoader = new BufferLoader(this.context, audioFiles, cb);
        this.bufferLoader.load();
    }

    play(audioBuffer) {
        const source = this.context.createBufferSource();
        source.buffer = audioBuffer;
        const gainNode = this.context.createGain();
        source.connect(gainNode);
        gainNode.connect(this.context.destination);
        gainNode.gain.value = 0.2;
        source.start(0);

        this.gainNode = gainNode;
    }

    setVolume(value) {
        this.gainNode = value;
    }

    trigger(action, notes, synthType) {
        let _this = this;

        notes.forEach(function(note) {
            let noteWithFreq = _this.addFrequencyToNote(note);
            let synth = _this[synthType];

            switch(action) {
                case 'on':
                    synth.start(noteWithFreq);
                    break;
                case 'off':
                    synth.stop(noteWithFreq);
                    break;
                default:
                    alert('Unrecognised player trigger');
            }
        });
    }

    triggerNote(action, name, delay) {
        if (!delay) delay = 0;
        let note = {
            name: name,
            number: music.noteNameToNoteNumber(name),
            frequency: music.noteNameToFrequency(name),
            gain: action === 'on' || 'onoff' ? 0.4 : 0
        };

        setTimeout(() => {
            switch(action) {
                case 'onoff':
                    this.myPolySynth.startStop(note);
                    break;
                case 'on':
                    this.myPolySynth.start(note);
                    break;
                case 'off':
                    this.myPolySynth.stop(note);
                    break;
                case 'stop':
                    this.myPolySynth.stopAll();
                    break;
                default:
                    alert('Unrecognised player trigger');
            }
        }, delay);
    }

    addFrequencyToNote(note) {
        return _.extend({}, note, {
            frequency: music.noteNumberToFrequency(note.number)
        });
    }
}

export default Player;
