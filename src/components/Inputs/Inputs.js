import keyboardInput from './Keyboard/Keyboard.js';
import MidiInput from './Midi/Midi.js';
import Player from '../Player/Player.js';
import Maths from '../../utils/Maths.js';
import music from '../../utils/Music.js';
const keyData = document.getElementById('key_data');
const log = console.log.bind(console);
let myPlayer;

function onMIDIMessage(event) {
    const data = event.data;
    // const cmd = data[0] >> 4;
    // const channel = data[0] & 0xf;
    const type = data[0] & 0xf0; // channel agnostic message type. Thanks, Phil Burk.
    const midiNote = data[1];
    const midiVelocity = data[2];

    const note = {
        name: music.noteNumberToName(midiNote),
        number: midiNote,
        gain: Maths.round100(midiVelocity / 127)
    };

    switch (type) {
        case 144: // noteOn message
            onInputMessage('on', note);
            break;
        case 128: // noteOff message
            note.gain = 0;
            onInputMessage('off', note);
            break;
    }

    //console.log('data', data, 'cmd', cmd, 'channel', channel);
    MidiInput.logger(keyData, 'key data', data);
}

// Midi not supported
function onMIDIFailure(e) {
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function canUseMidi() {
    return (navigator.requestMIDIAccess);
}

function onInputMessage(type, note) {
    myPlayer.trigger(type, [note], 'myMonoSynth');

    // trigger visual change
}

const Inputs = {
    bind: () => {
        myPlayer = new Player();

        if (canUseMidi()) {
            let midi = new MidiInput();

            midi.listen().then(function(midiAccess) {
                const inputs = midiAccess.inputs.values();
                // loop through all inputs
                for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                    // listen for midiAccess messages
                    input.value.onmidimessage = onMIDIMessage;
                    // this just lists our inputs in the console
                    midi.listInputs(input);
                }
                // listen for connect/disconnect message
                midiAccess.onstatechange = midi.listInputs.bind(midi);
            }, onMIDIFailure);
        } else {
            alert("Web Midi not supported!");
        }

        keyboardInput.onKeyboardEvent = onInputMessage;
        keyboardInput.bindEvents();

        //can bind microphone
        //bind microphone
    }
};

export default Inputs;
