//////////////////////////////////
// Parameter Definition


//Dom Parameters Start
let gameBoxes = document.querySelectorAll(".grid-item");
let playerTurns = document.querySelector("#playerTurn");
let restartBtn = document.querySelector("#restartBtn");



// Game Parameters
let winnerStatus = [[0,1,2],[3,4,5],[6,7,8],
                    [0,3,6],[1,4,7],[2,5,8],
                    [0,4,8],[2,4,6]];

let BoxArr = ["","","","","","","","",""];
let player = "X";
let gameRunning = true;
let gameMoveNumber = 0;



// Parameter Definition
//////////////////////////////////



/////////////////////////////////
// Function Definition

// Event Functions
gameBoxes.forEach((item)=>{

    item.addEventListener("click",(event)=>{
        if(gameRunning){
            boxClick(item);
        }
        
    });
    
});


restartBtn.addEventListener("click", function(){

    restartGame();

});

// Restart Game Func
function restartGame(){



gameBoxes.forEach((item)=>{
    item.innerHTML = "";  
 });

 
restartBtn.innerHTML = "Restart Game"
BoxArr = ["","","","","","","","",""];
player = "X";    
playerTurns.innerHTML = `${player} Turns`;
gameMoveNumber = 0;

gameRunning = true;


}

//click function
function boxClick(box){

    let  index = Number(box.getAttribute('data-index'));
    if(BoxArr[index] != "")
        return;
    BoxArr[index] = player;
    box.innerHTML = player;
    winnerCheck();
    console.log(gameMoveNumber)
    if(gameRunning){
        player = (player == "X") ? "O" : "X";
        playerTurns.innerHTML = `${player} Turns`;
        gameMoveNumber++;
    }
   
}

// Winner Check
function winnerCheck(){
   
    for(let i = 0; i<winnerStatus.length; i++){

        const condition = winnerStatus[i];
        const A = BoxArr[condition[0]];
        const B = BoxArr[condition[1]];
        const C = BoxArr[condition[2]];
        

        if(A == "" || B == "" || C == "")
            continue;
        if(A == B && B == C)
        {
            endGame(`${player} Wins`);
        }


    }

    if(gameMoveNumber >= 8){
        endGame("Draws");
    }
    console.log(BoxArr)
}

function endGame(status){
    gameRunning = false;
    playerTurns.innerHTML = status;
    restartBtn.innerHTML = "Restart Game"
}


// Function Definition
/////////////////////////////////
