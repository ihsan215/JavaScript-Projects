/////////////////////////////////////
// Parameter Define

// Dom Parameter
let ClockDom = document.querySelector("#clock");

// Interval Parameter
let timeInterval = null;

// Time Parameter
let dateObj = null;
let hour = 0;
let min = 0;
let sec = 0;

// Time string parameter
let timeString = "";
let suffixTime = "";


// Parameter Define
/////////////////////////////////////



/////////////////////////////////////
// Functions

function main(){

    // Update Time
    timeInterval = setInterval(updateTime,500);
   
}


function updateTime(){

    // Get Date
    dateObj = new Date();

    // Get Time
    hour = dateObj.getHours();
    min = dateObj.getMinutes();
    sec = dateObj.getSeconds();


    // Set 24 to 12 hour
    hour > 12 ? suffixTime = " PM" : suffixTime = " AM";
    hour %= 12;
    if(hour == 0){hour = 12};

    // Set time String
    hour > 9 ? timeString = `${hour}:` : timeString += `0${hour}:`;
    min > 9 ? timeString += `${min}:` : timeString += `0${min}:`;
    sec > 9 ? timeString += `${sec}` : timeString += `0${sec}`;

    // Set time string 
    ClockDom.innerHTML = timeString + `<sup class = "bg-grad font-monospace">${suffixTime}</sup>`;
    
    
}

// Functions
/////////////////////////////////////
