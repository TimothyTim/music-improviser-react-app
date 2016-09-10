import Musie from 'musie';

class Chord {
    constructor(chord, snapShot) {
        this.chord = chord;
        this.duration = chord.duration;
        this.masterVolume = 20;
        this.startPoint = snapShot;
        this.endPoint = this.getEndPoint();
    }

    getNotes(triggerOn) {
        const masterVol = this.masterVolume / 100;
        let chordNotes = Musie.get(this.chord.root, this.chord.harmony);
        let notesWithGain = [];

        chordNotes.forEach(function(note) {
            let fullNote = {
                name: note.name,
                number: note.number,
                frequency: note.frequency,
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
