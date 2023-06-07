/////////////////////////////////
// Parameter Definition

const clock = document.querySelector('#clock');
const clock_ctx = clock.getContext("2d");

// Assign Width and height
const Width = 500;
const Height = 500;

clock.width = Width;
clock.height = Height;

const radius = (clock.height / 2)*0.9;





// Parameter Definition
/////////////////////////////////

setInterval(drawClock,1000);


/////////////////////////////////
// Functions

function drawClock(){

    clock_ctx.reset();
    clock_ctx.arc(250,250,radius,0,2*Math.PI);
    clock_ctx.fillStyle = "white";
    clock_ctx.fill();

    let grad = clock_ctx.createRadialGradient(250, 250 
    ,radius , 250, 250, radius * 1.1);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    clock_ctx.strokeStyle = grad;
    clock_ctx.lineWidth = radius*0.1;
    clock_ctx.stroke();

    drawNumbers();
    drawTime();

}


function drawNumbers(){

    let ang = 0;
    let num = 4;

    clock_ctx.font = radius * 0.15 + "px arial";

    clock_ctx.textBaseline = "middle";
    clock_ctx.textAlign = "center";


    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      clock_ctx.rotate(ang);
      clock_ctx.translate(0, -radius * 0.85);
      clock_ctx.rotate(-ang);
      clock_ctx.fillStyle = "black";
      clock_ctx.fillText(num.toString(), 250,250);
      clock_ctx.rotate(ang);
      clock_ctx.translate(0, radius * 0.85);
      clock_ctx.rotate(-ang);
    }



}


function drawTime(){

    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour%12;

   clock_ctx.strokeStyle = "rgb(40, 40, 40)";
   clock_ctx.lineCap = "round";
   clock_ctx.lineWidth = 3;
   
   drawHand(radius*2/3.2, hour * 30);

   clock_ctx.strokeStyle = "rgb(40, 40, 40)";
   clock_ctx.lineCap = "round";
   clock_ctx.lineWidth = 3;
   drawHand(radius*2/3, minute * 6);

   clock_ctx.strokeStyle = "red";
   clock_ctx.lineWidth = 1;
   drawHand(radius*2/3, second * 6);
   
 

}


function drawHand(length, angle) {
   
    clock_ctx.save();
    clock_ctx.beginPath();
    clock_ctx.translate(250, 250);
    clock_ctx.rotate(-180 * Math.PI/180); 
    clock_ctx.rotate(angle * Math.PI/180);
    clock_ctx.moveTo(0, 0);
    clock_ctx.lineTo(0, length);
    clock_ctx.stroke();
    clock_ctx.closePath();
    clock_ctx.restore();
   
}


// Functions
/////////////////////////////////

