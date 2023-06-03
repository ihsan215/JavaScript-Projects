/////////////////////////////////////
// Parameter Define

// Dom Parameter
let stopwatch = document.querySelector("#stopwatch");

let startBtn = document.querySelector("#startBtn");
let stopBtn = document.querySelector("#stopBtn");
let resetBtn = document.querySelector("#resetBtn");

// Time Interval Parameter
let updateTimeInterval = null;
let stopTimeStart = 0;
let stopTimeInterval = 0;


// Parameter Define
/////////////////////////////////////

/////////////////////////////////////
// Button Click Events 

// Start Button Click Event
startBtn.addEventListener("click" , ()=>{

    stopTimeInverval(updateTimeInterval);

    if(startBtn.innerHTML == "Start"){
        startTime = new Date();
        stopTimeInterval = 0;
        updateTimeInterval = setInterval(()=>{
            updateTimeIntervalFunc(new Date() - startTime)
        },100);
    }
    else if(startBtn.innerHTML == "Resume"){

        stopTimeInterval += new Date() - stopTimeStart;
        updateTimeInterval = setInterval(()=>{
            let time = (new Date() - startTime) - stopTimeInterval;      
            updateTimeIntervalFunc(time)
        },100);
        startBtn.innerHTML = "Start";
    }

});

// Stop Button Click Event
stopBtn.addEventListener("click" , ()=>{

    if(startBtn.innerHTML == "Start"){
        stopTimeInverval(updateTimeInterval);
        startBtn.innerHTML = "Resume";
        stopTimeStart = new Date();
     
    }

});

// Reset Button Click Event
resetBtn.addEventListener("click" , ()=>{

    stopTimeInverval(updateTimeInterval);
    updateTimeIntervalFunc(0);
    startBtn.innerHTML = "Start";
    stopTimeInterval = 0;
});

// Button Click Events 
/////////////////////////////////////


////////////////////////////////////
// Time Interval Func
function updateTimeIntervalFunc(time){

    let hour = Math.floor(time/3600000);
    let min = Math.floor(time/60000);
    let sec = Math.floor(time/1000);

    sec %= 60;
    min %= 60;

    let time_string = "";

    hour > 9 ? time_string = `${hour}:`: time_string = `0${hour}:`;
    min > 9 ? time_string += `${min}:`: time_string += `0${min}:`;
    sec > 9 ? time_string += `${sec}`: time_string += `0${sec}`;
    
    stopwatch.innerHTML = time_string;
}

function stopTimeInverval(name){
    clearInterval(name);
}

// Time Interval Func
////////////////////////////////////

