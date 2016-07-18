import Music from '../../../utils/Music.js';

let Keyboard = {};
let keysPressed = {};
const keymap = {
    65: 'C4',
    87: 'C#4',
    83: 'D4',
    69: 'D#4',
    68: 'E4',
    70: 'F4',
    84: 'F#4',
    71: 'G4',
    89: 'G#4',
    90: 'G#4',
    72: 'A4',
    85: 'A#4',
    74: 'B4',
    75: 'C5',
    79: 'C#5',
    76: 'D5',
    80: 'D#5',
    59: 'E5',
    186: 'E5',
    222: 'F5',
    221: 'F#5',
    220: 'G5'
};

Keyboard.bindEvents = function() {
    // add event listeners
    document.addEventListener('keydown', this.keyController);
    document.addEventListener('keyup', this.keyController);
};

// qwerty keyboard controls. [q,w,e,r,t]
Keyboard.keyController = function(e) {
    let type = null;
    let noteName = keymap[e.keyCode];
    let note = {
        name: noteName,
        number: Music.noteNameToNoteNumber(noteName),
        gain: 0.6
    };

    if (e.type == "keyup") {
        delete keysPressed[note.name];
        type = 'off';
        note.gain = 0;
    }

    if (!keysPressed[note.name]) {
        if (e.type == "keydown") {
            keysPressed[note.name] = true;
            type = 'on';
        }

        switch (e.keyCode) {
            case 65:
            case 87:
            case 83:
            case 69:
            case 68:
            case 70:
            case 84:
            case 71:
            case 89:
            case 90:
            case 72:
            case 85:
            case 74:
            case 75:
            case 79:
            case 76:
            case 80:
            case 59:
            case 186:
            case 222:
            case 221:
            case 220:
                Keyboard.onKeyboardEvent(type, note);
                break;
        }
    }
};

Keyboard.onKeyboardEvent = function () {};

export default Keyboard;
