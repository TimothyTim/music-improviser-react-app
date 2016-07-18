import $ from 'jquery';

function MidiInput() {
    this.log = console.log.bind(console);
}

MidiInput.prototype.listen = function() {
    // request MIDI access
    return navigator.requestMIDIAccess({
        sysex: false
    });
};

MidiInput.prototype.listInputs = function(input) {
    let type;
    let name;
    let version;
    let manufacturer;
    let state;
    let id;

    if (!input.port) {
        // New input listing
        const newInput = input.value;
        type = newInput.type;
        name = newInput.name;
        version = newInput.version;
        manufacturer = newInput.manufacturer;
        state = newInput.state;
        id = newInput.id;

        $('#midi_source .name').text(name);
        $('#midi_source .manufacturer').text(manufacturer);
        $('#midi_source .state').text(state);
    } else {
        // state change
        const port = input.port;
        type = port.type;
        state = port.state;
        manufacturer = port.manufacturer;
        name = port.name;
        version = port.version;
        id = port.id;

        $('#midi_source .name').text(name);
        $('#midi_source .manufacturer').text(manufacturer);
        $('#midi_source .state').text(state);
    }

    this.log('Input port: [ type:"' + type + '" id: "' + id +
        '" manufacturer: "' + manufacturer + '" name: "' + name +
        '" version: "' + version + '"]');
};

MidiInput.prototype.logger = function(container, label, data) {
    const messages = label + ' [channel: ' + (data[0] & 0xf) + ', cmd: ' + (data[0] >> 4) + ', type: ' + (data[0] & 0xf0) + ' , note: ' + data[1] + ' , velocity: ' + data[2] + ']';
    container.textContent = messages;
};

export default MidiInput;
