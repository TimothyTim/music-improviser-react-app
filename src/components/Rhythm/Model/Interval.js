import Chromatic from './Chromatic';

export default {
    getNote: (note, interval, octave) => {
        const noteOctave = octave ? octave : 3;
        const indexOfNote = Chromatic.indexOf(note);

        if (indexOfNote === -1) {
            console.error('Not a valid note');
            return ;
        }

        return Chromatic[indexOfNote + interval] + noteOctave;
    }
};
