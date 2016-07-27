/* eslint-disable */
import intvl from './Interval.js';
import * as scales from '../../../constants/scales.js';

function calculateScaleByIntervals(scaleByIntervals, note) {
  let scale = [];
  let newNote = Object.assign({}, note);
  if (!note.octave) note.octave = 3;

  scaleByIntervals.forEach((interval) => {
    let noteCopy = Object.assign({}, newNote);
    newNote = intvl.getNote(noteCopy, interval);
    scale.push(newNote);
  });

  return scale;
}

let Scale = {};

Scale.get = (name, note) => {
  return calculateScaleByIntervals(scales[name], note);
};

export default Scale;
/* eslint-enable */
