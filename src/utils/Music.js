function Music() {
    this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    this.harmonies = ['major', 'minor', 'dominant', 'diminished'];
    this.extensions = ['b5', '#5', 'b9', '#9'];
    this.noteMap = {};
    this.noteNumberMap = [];
    this.noteFrequencyMap = [];
    this.setupUtil();
}

Music.prototype.setupUtil = function() {
    for (let i = 0; i < 127; i++) {
        const index = i;
        let key = this.notes[index % 12];
        const octave = ((index / 12) | 0) - 1; // MIDI scale starts at octave = -1

        key += octave;

        this.noteMap[key] = i;
        this.noteNumberMap[i] = key;
    }
};

Music.prototype.noteNameToNoteNumber = function(name) {
    return this.noteMap[name];
};

Music.prototype.noteNameToFrequency = function(name) {
    let noteNum = this.noteNameToNoteNumber(name);
    return this.noteNumberToFrequency(noteNum);
};

Music.prototype.noteNumberToFrequency = function(note) {
    return 440.0 * Math.pow(2, (note - 69.0) / 12.0);
};

Music.prototype.noteNumberToName = function(note) {
    return this.noteNumberMap[note];
};

Music.prototype.frequencyToNoteNumber = function(f) {
    return Math.round(12.0 * this.getBaseLog(f / 440.0, 2) + 69);
};

Music.prototype.getBaseLog = function(value, base) {
    return Math.log(value) / Math.log(base);
};

Music.prototype.convertLinearValToBeatPos = function(linearVal) {
    const beatLength = 4;
    const breakdown = (linearVal + 1) / beatLength;
    const beatIndex = Math.ceil(breakdown);
    const subBeatIndex = (((linearVal/beatLength) % 1) * 4) + 1;

    return {
        beatIndex: beatIndex,
        subBeatIndex: subBeatIndex
    };
};

Music.prototype.convertBeatPosToLinearVal = function(beatPos) {
    return (((beatPos.beatIndex - 1) * 4) + beatPos.subBeatIndex) - 1; // 0 - 15
};

export default new Music();
