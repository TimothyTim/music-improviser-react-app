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

        this.context = this.canvas.getContext("2d");
        window.addEventListener("resize", this.resize.bind(this));
		this.resize();

        this.draw();

		this._currentNotes = null;
    }

    resize() {
        console.log(this.canvas);
        this.canvasWidth = this.canvas.offsetWidth * 2;
        this.canvasHeight = this.canvas.offsetHeight * 2;
        this.context.canvas.width = this.canvasWidth;
        this.context.canvas.height = this.canvasHeight;
        if (this._currentNotes){
            this.setNotes(this._currentNotes);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.save();
        this.context.translate(-2 * 2, 0);

        this.context.fillRect(10, 10, 55, 50);
        // var notes = this.currentlyDisplayedNotes;
        //
        // for (var i = 0; i < notes.length; i++){
        //     var n = notes[i];
        //     n.draw(this.context);
        // }

        this.context.restore();
    }
}

export default function(container) {
    if (!pianoRoll) {
        pianoRoll = new PianoRoll(container);
    }

    return pianoRoll;
}
