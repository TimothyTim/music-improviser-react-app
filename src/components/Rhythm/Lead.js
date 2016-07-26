import Scale from './Model/Scale.js';

class Lead {
    constructor() {
        this.scale = new Scale('C');
    }

    next() {
        console.log("play something");
    }
}

export default Lead;
