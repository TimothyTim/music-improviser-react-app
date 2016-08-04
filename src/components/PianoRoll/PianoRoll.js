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

        this.circles = [{x:400,y:400,r:50,color:25,vx:6,vy:10},
                  {x:500,y:300,r:100,color:125,vx:2,vy:-8},
                  {x:800,y:350,r:25,color:285,vx:20,vy:-20},
                  {x:800,y:700,r:75,color:325,vx:13,vy:-8},
                  {x:400,y:500,r:120,color:175,vx:-4,vy:-6}];

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

         for(let i=0; i<this.circles.length; i++){
             this.context.fillStyle = 'hsl(' + this.circles[i].color + ',100%,50%)';
             this.context.beginPath();
             this.context.arc(this.circles[i].x,this.circles[i].y,this.circles[i].r,0,2*Math.PI,false);
             this.context.fill();

             if((this.circles[i].x + this.circles[i].vx + this.circles[i].r > 1 + this.canvasWidth) || (this.circles[i].x - this.circles[i].r + this.circles[i].vx < 1)){
                this.circles[i].vx = - this.circles[i].vx;
             }
             if((this.circles[i].y + this.circles[i].vy + this.circles[i].r > 1 + this.canvasHeight) || (this.circles[i].y - this.circles[i].r + this.circles[i].vy < 1)){
                 this.circles[i].vy = - this.circles[i].vy;
             }
             this.circles[i].x +=this.circles[i].vx;
             this.circles[i].y +=this.circles[i].vy;
         }
    }

    addNote(note, duration) {
        console.log(note, duration);
        this.circles.push({x:this.canvasWidth/2,y:this.canvasHeight/2,r:note.number,color:Math.round(Math.random()*400),vx:6,vy:10});
    }
}

export default function(container) {
    if (!pianoRoll) {
        pianoRoll = new PianoRoll(container);
    }

    return pianoRoll;
}
