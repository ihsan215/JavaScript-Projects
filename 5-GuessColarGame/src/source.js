///////////////////////////////
// Parameter Definition

// Dom Parameter
let guessColor = document.querySelector("#guess-color"); // Question Text
let btns = document.querySelectorAll(".color-btns"); // Color Buttons
let gameOptionBtns = document.querySelectorAll(".btn-check"); // Easy & Hard Options
let gameControlBtn = document.querySelector("#btn-control"); // Change Color | New Game Button
let MainAreaDiv = document.querySelector("#main-area"); // Main Area


// Game Parameter
let isgameHard = true;
let WinnerBtnIndex = null;



// Parameter Definition
///////////////////////////////


///////////////////////////////
// Function Definition
startGame();


function startGame(){

    MainAreaDiv.classList.remove("right-answer");
    gameControlBtn.innerHTML = "Change Color";
    generateColor();
 
}



function generateColor(){

    ///////////////////////////////////////////////
    // Select Question Color And Right Button 

    let btnNumber = isgameHard ? 6:3;
    WinnerBtnIndex = Math.floor(Math.random() * btnNumber);

    let questionColor = generateRandomColor();
    btns[WinnerBtnIndex].style.backgroundColor = questionColor;
    btns[WinnerBtnIndex].id= "winner";
    guessColor.innerHTML = questionColor.toUpperCase();

     //Select Question Color And Right Button 
    ///////////////////////////////////////////////


    ///////////////////////////////////////////////
    // Assign Random Color to Buttons and Event

    btns.forEach((item,index)=>{

        item.style.visibility = "visible";
        item.style.display = "inline-block";
        item.disabled = false;
        item.addEventListener("click", colorOptionClick);
        if(index == WinnerBtnIndex) return;
        item.id = "Loser"

        if(!isgameHard && index>2){
            item.style.display = "none";                
        }
        else{
            item.style.display = "inline-block";
            item.style.backgroundColor = generateRandomColor();
        }
            
    });

    // Assign Random Color to Buttons
    ///////////////////////////////////////////////
}

// Generate Random Colors
function generateRandomColor(){

    // Select Random RGB values
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);

    return `rgb(${randomR},${randomG},${randomB})`;

}


// Evet Functions Start

// Game option Setting
gameOptionBtns.forEach((item)=>{

    item.addEventListener("change" , ()=>{
    
        switch (item.id){

            case 'easy-btn':{
                isgameHard = false;
                
                break;
            }

            case 'hard-btn':{
                isgameHard = true;

                break;
            }

            default:{
                isgameHard = true;

                break;
            }

        }

        startGame();
    });
});

// New Game Events
gameControlBtn.addEventListener("click", () =>{
    startGame();
})


// Option Buttons Click Event
function colorOptionClick(event){

    if(event.target.id == "winner"){
        MainAreaDiv.classList.add("right-answer");
        btns.forEach((item,index)=>{
            item.disabled = true;
            if(index == WinnerBtnIndex) return;    
            item.style.backgroundColor = event.target.style.backgroundColor;
        });

        gameControlBtn.innerHTML = "New Game";
    
    }
    else{
        event.target.style.visibility = "hidden";
        MainAreaDiv.classList.add("false-answer");
        setTimeout(()=>{
            MainAreaDiv.classList.remove("false-answer");
        },300)
    }
}


// Evet Functions End

// Function Definition
///////////////////////////////

