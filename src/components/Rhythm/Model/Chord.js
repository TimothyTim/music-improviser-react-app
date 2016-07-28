import $ from 'jquery';
import Music from '../../../utils/Music.js';

class Chord {
    constructor(chord, snapShot) {
        this.name = chord.name;
        this.duration = chord.duration;
        this.masterVolume = $('.slider');
        this.startPoint = snapShot;
        this.endPoint = this.getEndPoint();
    }

    getNotes(triggerOn) {
        const masterVol = this.masterVolume.val() / 100;
        let chordNotes = [];
        let notesWithGain = [];

        // convert chord name to a series of notes
        // Bbmaj -> [note1, note2, note3]

        switch(this.name) {
            case "C":
                chordNotes = ["C4", "E4", "G4"];
                break;
            case "Am":
                chordNotes = ["A4", "C4", "E4"];
                break;
            case "Dm":
                chordNotes = ["D4", "F4", "A4"];
                break;
            case "G":
                chordNotes = ["G4", "B4", "D4"];
                break;
            default:
                alert("Chord not found");
        }

        chordNotes.forEach(function(name) {
            let fullNote = {
                name: name,
                number: Music.noteNameToNoteNumber(name),
                gain: triggerOn ? masterVol : 0
            };

            notesWithGain.push(fullNote);
        });

        return notesWithGain;
    }

    getEndPoint() {
        let newEndPoint = this.startPoint;

        newEndPoint.beatIndex += this.duration;

        while (newEndPoint.beatIndex > 4) {
            // debugger;
            newEndPoint.beatIndex -= 4;
            newEndPoint.barIndex++;

            if (newEndPoint.barIndex > 4) {
                newEndPoint.barIndex = 1;
            }
        }

        return newEndPoint;
    }
}

export default Chord;
