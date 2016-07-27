import intvl from './Interval.js';

let Scale = {};

Scale.chromatic = (note) => {
  let scaleByIntervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let scale = [];
  if (!note.octave) note.octave = 3;

  scaleByIntervals.forEach((interval) => {
    scale.push(intvl.getNote(note, interval));
  });

  return scale;
}

Scale.pentatonic = () => {

}

export default Scale;
