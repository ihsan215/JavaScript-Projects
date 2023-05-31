//////////////////////////////////////
// Parameter Definition

// Dom Parameters
let LetterBtnsUl = document.querySelector(".LetterBtnsUl");
let wordLetterArea = document.querySelector(".WordDivUl");
let livesDom = document.querySelector("#lives");
let CategoryDom = document.querySelector("#Category");
let restartBtn = document.querySelector("#restartGameBtn");
let HintBtn = document.querySelector("#HintBtn");
let Hinttxt = document.querySelector("#hint");
let hangman = document.querySelector("#hangman");

const ctx_hangman = hangman.getContext('2d');

const drawPhase = [[20, 150, 100, 150],[60, 150, 60, 20],[50, 20, 100, 20],
[100,20,100,40],[100, 48, 7, 0, 3 * Math.PI],[100,55,100,85],
[100,65,110,75],[100,65,90,75],[100,85,90,100],[100,85,110,100]]


// Game Parmaeter
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let guessWord = [ "star trek", "star wars",
                  "engineer" ,  "software",
                  "Spoon"    ,  "article"];

let categories = ["Sci-Fic Films","Sci-Fic Films",
                 "Jobs", "Computer Science",
                 "Kitchen Tools", "Academia"]

let hints = ["A series about the five-year-deep space adventures of a spaceship called the Enterprise.","A series that takes place in a faraway part of the galaxy and tells about the dark and light battle of power.",
             "The profession that solves problems by producing technology" , "It allows you to make changes on systems without using hardware.",
             "It can be used for soup drinking." , "Published work of researchers."];

const LIVES = 10;

let selectedWord = "";
let letterCounter = 0;
let lives = drawPhase.length;
let spaceIndex = 0;


// Parameter Definition
//////////////////////////////////////

// Start Game
startGame();

//////////////////////////////////////
// Function Parameters


function startGame(){

    // Reset Parameters
    selectedWord = "";
    letterCounter = 0;
    lives = LIVES;
    Hinttxt.innerHTML = "";

    // Call Functions
    updateLivesDom();
    createLetterBtns();
    generateWord();

    // Assign Event to btns
    assignEventToBtns();

    // Clear Canvas
    ctx_hangman.clearRect(0, 0, hangman.width, hangman.height);

}


// Create List Item
function createLetterBtns(){
   
    for(let i = 0; i<alphabet.length; i++){
        let list = document.createElement('li');
        list.onclick = null; 
        list.classList.add("letterItem");
        list.innerHTML = alphabet[i];
        clickLetterItem(list);
        LetterBtnsUl.appendChild(list); 
        

    }
    
}


// Letters Click Item Function
function clickLetterItem(list){
    list.onclick = function (){
        checkLetter(list);
        checkGameStatus();
        list.classList.remove("letterItem");
        list.classList.add("letterItemClick"); 
        list.onclick = null;   
    }

}

// Generate the word Function
function generateWord(){

let randomIndex = Math.floor(Math.random() * (guessWord.length))

CategoryDom.innerHTML = `The Category is : ${categories[randomIndex]}`;


selectedWord = guessWord[randomIndex];
spaceIndex = selectedWord.indexOf(" ");
if(spaceIndex != -1)
    letterCounter++;

for(let i = 0; i<selectedWord.length;i++){

    let list = document.createElement('li');
    list.classList.add("WordItem");
    if(i == spaceIndex){
        list.innerHTML = ` `;
        list.classList.add("Wordspace")
    }
    else{
        list.innerHTML = `_`;
    }

    wordLetterArea.appendChild(list); 
}

}


// Check The Letter In the Word

function checkLetter(list){


let found = false
for(let i = 0; i<selectedWord.length;i++){

    if(selectedWord[i] == list.innerHTML){
      
        wordLetterArea.children[i].innerHTML = list.innerHTML;

        if(i == 0 || i == spaceIndex+1){
            wordLetterArea.children[i].innerHTML= wordLetterArea.children[i].innerHTML.toUpperCase();   
        }

        letterCounter++;
        found = true;
    }

}

    if(!found){
        drawStickMan(drawPhase[drawPhase.length-lives]);
        lives--;
        updateLivesDom();
    }


}


// Update Lives Dom
function updateLivesDom(){

    livesDom.innerHTML = `You Have ${String(lives)} Lives`;

    let color;
    let shadow;

    if(lives > 7){
    color = "#03b68c";
    shadow = "0rem 0rem 1rem #036553";
    }

    else if(lives <= 7 && lives > 3){
    color = "#bab709";
    shadow = "0rem 0rem 1rem #036553";
    }
    else{
    color = "#be1000";
    shadow = "0rem 0rem 1rem #dd2104";
    }

    livesDom.style.color = color;
    livesDom.style.textShadow = shadow;
}



// Check Game Status
function checkGameStatus(){

    if(lives <= 0){
        livesDom.innerHTML = `You Lose !`;

        for(let i = 0; i<LetterBtnsUl.children.length; i++){
            LetterBtnsUl.children[i].onclick = null;
            LetterBtnsUl.children[i].classList.add("letterItemLose"); 

        }
        
    }


    else if(letterCounter == selectedWord.length){
        livesDom.innerHTML = `You Win !`;

        for(let i = 0; i<LetterBtnsUl.children.length; i++){
            LetterBtnsUl.children[i].onclick = null;
            LetterBtnsUl.children[i].classList.add("letterItemWin"); 

        }
    }

}


// Assign Btn Event
function assignEventToBtns(){

    restartBtn.onclick = null;
    restartBtn.onclick = function(){

    while (LetterBtnsUl.firstChild) {
        LetterBtnsUl.firstChild.remove()
    }
    while (wordLetterArea.firstChild) {
        wordLetterArea.firstChild.remove()
    }
        
     startGame();
       
     };


     HintBtn.onclick = null;
     HintBtn.onclick = function(){

        let index = guessWord.indexOf(selectedWord);
        Hinttxt.innerHTML = hints[index];

     };

}

// Draw Stick Man Func
function drawStickMan(arr){

    ctx_hangman.strokeStyle = 'white';
    ctx_hangman.lineWidth = 2;
    ctx_hangman.beginPath();
    if(arr.length == 5){
        ctx_hangman.arc(arr[0], arr[1], arr[2], arr[3], arr[4]);
    }
    else{
        ctx_hangman.moveTo(arr[0], arr[1]);
        ctx_hangman.lineTo(arr[2], arr[3]);
      
    }
    ctx_hangman.stroke();
}



// Function Parameters
//////////////////////////////////////


