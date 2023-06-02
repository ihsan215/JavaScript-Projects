/////////////////////////////
// Parameter Definition


// Dom Parameter
let gameArea = document.querySelector("#gameArea");
let NextBtn = document.querySelector("#NextBtn");
let PreBtn = document.querySelector("#PreBtn");
let mainArea = document.querySelector(".row");

// Game Parameter
let questions = ["What is 8x8 ?" , 
                 "What is 5x5 ?" , 
                 "What is 25x5 ?" ,
                 "What is 12x4 ?" ,
                 "What is 15x3 ?"
                ];

let options = [["12" , "24" , "64", "32"],
               ["5" , "125" , "30", "25"],
               ["100" , "255" , "125", "45"],
               ["24" , "100" , "60", "48"],
               ["65" , "75" , "45", "30"]
            ];

const Correctanswer = [2,3,2,3,2];
let answer = [-1,-1,-1,-1,-1];


let questionCounter = 0;


// Parameter Definition
///////////////////////////

startGame();


//////////////////////////////////////
// Functions

// Start Game Func
function startGame(){

    answer = [-1,-1,-1,-1,-1];
    questionCounter = 0;
    clearAlert();
    NextBtn.innerHTML = "Next";
    NextBtn.style.width = "100px";
    createOptions(questionCounter);
 
}

function createOptions(index){


    // Display Pre Btn
    (index == 0) ? PreBtn.style.visibility = "hidden" : PreBtn.style.visibility = "visible";
 

    // Remove Las child
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }

    // Create Questions
    let question = document.createElement('h3');
    question.innerHTML = `Question ${index+1} : ${questions[index]}`;
    gameArea.appendChild(question);

    // Create Options
    for(let i = 0; i<4; i++){
        let optionArea = document.createElement('div');
        optionArea.classList.add("form-check");
        
         let input = document.createElement('input');
         input.classList.add("form-check-input");
         input.type = "radio";
         input.name = `options`;
         input.id = `options`;

         let label = document.createElement('label');
         label.classList.add("form-check-label" , "options");
         label.for = input.name;
         label.innerHTML = options[index][i];

         optionArea.appendChild(input);
         optionArea.appendChild(label);

         gameArea.appendChild(optionArea);
    }


    if(answer[index] != -1){
        let options = document.querySelectorAll(".form-check-input");
        options[answer[index]].checked  = true;
    }
 

}

// Set Alert Msg Function
function setAlert(Alertmsg,alerttype){

    clearAlert();
    let alertDiv = document.createElement('div');
    switch(alerttype){
        case "warning":{
            alertDiv.classList.add("GameAlertWarning");
            break;
        }
        case "endGame":{
            alertDiv.classList.add("GameAlertEndGame");
            break;
        }
        default:{
            alertDiv.classList.add("GameAlertWarning");
            break;
        }
    }
    alertDiv.id = "alert";
    let msg = document.createElement('p');
    msg.classList.add("alertMsg");
    msg.innerHTML = Alertmsg;


    alertDiv.appendChild(msg);
    mainArea.appendChild(alertDiv);

}

// Cleart Alert Msg
function clearAlert(){

    let alert = document.getElementById("alert");
    
    if(alert){
        alert.parentNode.removeChild(alert);
    }

}

// End Game
function endGame(){

    let trueAnswer = 0;

    Correctanswer.forEach((item,index)=>{
        if(item == answer[index]){
            trueAnswer++;
        }
    })

    // Remove Las child
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }

    PreBtn.style.visibility = "hidden" 
    NextBtn.innerHTML = "Restart Quiz";
    NextBtn.style.width = "150px";
    let score = trueAnswer * 20;
    setAlert(`Your Score is ${score}`,"endGame");

}

// Event Function

// Next Question
NextBtn.addEventListener("click", ()=>{

    if(NextBtn.innerHTML == "Restart Quiz"){
        startGame();
        return;
    }

    let options = document.querySelectorAll(".form-check-input");
    for(let i = 0; i<options.length; i++){
        
        if(options[i].checked){
            answer[questionCounter] = i;
            break;
        }
        
        if(i == options.length-1)
        {
            setAlert("Please Select An Option","warning");
            setTimeout(clearAlert, 1000);
            return;
        }
    }

    
    questionCounter++;

    if(questionCounter >= 5){
        endGame();
        return;
    }
    if(questionCounter == 4){
        NextBtn.innerHTML = "Finish Quiz";
        NextBtn.style.width = "150px";
    }
    createOptions(questionCounter);
    
});

// Previous Question
PreBtn.addEventListener("click", ()=>{

    if(questionCounter >= 0){
        if(questionCounter == 4){
            NextBtn.innerHTML = "Next";
            NextBtn.style.width = "100px";
        }
        questionCounter--;
        createOptions(questionCounter);
    }
    
});

// Functions
//////////////////////////////////////
