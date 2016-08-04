import Clock from '../Clock/Clock.js';

let pianoRoll = null;

class PianoRoll {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.container.appendChild(this.canvas);
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.pixelsPerSecond = 100;
        this.numberOfNotes = 12;
        this.firstNoteNumber = 60;
        this.lastNoteNumber = 72;

        this.notes = [];

        this.context = this.canvas.getContext("2d");
        window.addEventListener("resize", this.resize.bind(this));
		this.resize();

		this._currentNotes = null;
    }

    resize() {
        this.canvasWidth = this.canvas.offsetWidth * 2;
        this.canvasHeight = this.canvas.offsetHeight * 2;
        this.context.canvas.width = this.canvasWidth;
        this.context.canvas.height = this.canvasHeight;
        this.draw();
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.strokeStyle = 'black';
        this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
        this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
        this.context.strokeRect(0,0,this.canvasWidth,this.canvasHeight);

         for(let i=0; i<this.notes.length; i++){
             this.context.fillStyle = 'hsl(' + this.notes[i].color + ',100%,50%)';
             this.context.beginPath();
             this.context.rect(this.calculateXPos(this.notes[i].x), this.calculateYPos(this.notes[i].y), this.notes[i].duration/5, this.canvasHeight/this.numberOfNotes);
             this.context.fill();

             this.notes[i].x += this.notes[i].vx / Clock().bps;
             this.notes[i].y += this.notes[i].vy;
         }
    }

    addNote(note, duration) {
        const noteProportionOfHeight = (note.number-(this.firstNoteNumber-1)) / this.numberOfNotes;
        this.notes.push({x:0,y:noteProportionOfHeight,duration:duration,color:Math.round(Math.random()*400),vx:1,vy:0});
    }

    calculateYPos(heightProportion) {
        return this.canvasHeight - (heightProportion * this.canvasHeight);
    }

    calculateXPos(x) {
        return this.canvasWidth - x;
    }
}

export default function(container) {
    if (!pianoRoll) {
        pianoRoll = new PianoRoll(container);
    }

    return pianoRoll;
}
