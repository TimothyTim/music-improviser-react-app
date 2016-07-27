import intvl from './Interval.js';

let Scale = {};

function calculateScaleByIntervals(scaleByIntervals, note) {
  let scale = [];
  let newNote = note;
  if (!note.octave) note.octave = 3;

  scaleByIntervals.forEach((interval) => {
    newNote = intvl.getNote(newNote, interval);
    scale.push(newNote);
  });

  return scale;
}

Scale.chromatic = (note) => {
  return calculateScaleByIntervals([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], note);
};

Scale.pentatonic = (note) => {
  return calculateScaleByIntervals([0, 3, 2, 2, 3], note);
};

export default Scale;
