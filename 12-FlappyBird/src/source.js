///////////////////////////////
// Parameter Definition

// Game Message
let GameMessage = document.querySelector('#game-msg');

// Game Score
let score = 0;

// Game Area
const GameArea = document.querySelector('.game-area');


// Game Area Widt
const GameAreaWidth = 1200; //px

// Game Area height
const GameAreaHeight = 400; //px

// Assign width and height
GameArea.style.width = String(GameAreaWidth)+'px';
GameArea.style.height = String(GameAreaHeight)+'px';


// Bird
let Bird;

const BirdHeight = 60; // px

const g = 5;//px (vertical velocity)

// Wall Parameter

// Wall Width
const wallWidth = 30; // px

// Wall Space
const wallSpace = 400; // px

// Initial Wall Pos
const initialWallPos = 900; // px


// Wall Speed
let WallSpeedX = 1; // px/interval

// Max Gap Heigth
const maxGapHeigth = 80; // px
const minGapHeigth = 60; // px


// Game Status : is Run

let isGameRun = false;

// Internal Param
let GravityInterval;
let MoveWallsInterval = new Array(3);
let BirdMoveInterval;

// first ımpact
let firstImpact = true;

// Create Walls
let walls = new Array(3);

// Wall Move Function
let Gap = new Array(3);

// Gap Heights
let GapHeight = new Array(3);
// Parameter Definition
///////////////////////////////

document.addEventListener('keypress', (event) => {
    var name = event.key;
    if(name == "Enter" && !isGameRun){
        firstImpact = true;
        startGame();
    }

    if(isGameRun){
        if(name == 'w'){
            Gravity(Bird,-6*g);
           
        }
    }
    
  });

///////////////////////////////
// Function Definition


function startGame(){

    // Restart Score
    score = 0;
    // Game Message
    GameMessage.innerHTML = `Score : ${score}`;

    // Bird Insert
    Bird = document.createElement('img');
    Bird.src = './src/img/bird.png';
    Bird.style.height = String(BirdHeight) + 'px';
    Bird.style.width = String(BirdHeight) + 'px';
    Bird.classList.add('bird');

    GameArea.appendChild(Bird);

    // Set Initial Bird Position
    Bird.style.top =  String(GameAreaHeight/2) + 'px';

    // Start gravity
    GravityInterval = setInterval(Gravity,50,Bird,g/2);

    // Start game
    isGameRun = true;

  

    for(let i = 0; i<3; i++){

        // Create Div
        walls[i] = document.createElement('div');

        // Assign Initial Pos and Width
        let initialPos = initialWallPos + i*wallSpace;
        walls[i].style.left = String(initialPos) + 'px';
        walls[i].style.top = String(-(i*GameAreaHeight)-(BirdHeight)) + 'px';
        walls[i].style.width = String(0) + 'px';


        // Assign Class
        walls[i].classList.add('walls');

        //Create gap
        generateRandomGap(walls[i],i);
     

      
    }
  
    // Append Walls
    walls.forEach((item,index)=>{
        GameArea.appendChild(item);
        // Start Wall Moving
        MoveWallsInterval[index] = setInterval(moveWalls,5,WallSpeedX,item,index)

    });

    // Check bird move and gaps
    BirdMoveInterval = setInterval(checkWallandBirdPos,5);
  


}




function moveWalls(speedX,wall,index)
{       
       // Determine wall position
       let x_pos =  removePx(wall.style.left);
  

        // Check Wall Position
        if(x_pos < 0){

            // Reduce size 
           let width =  removePx(wall.style.width) - speedX;  
           wall.style.width = width + 'px';

           // Check Size
           if (width <= 0){
            wall.style.left = GameArea.style.width;  
           }
             
           return 0;
        }

        let creaateGap = false;

        if((x_pos >= (GameAreaWidth - wallWidth)) && 
          (x_pos <= GameAreaWidth) &&  (removePx(wall.style.width)<wallWidth)){

            if(x_pos == GameAreaWidth){
                creaateGap = true;
            }
            // Increse widt
            if(creaateGap){
                generateRandomGap(wall,index);
                creaateGap = false;

            }
            let width =  removePx(wall.style.width) +   speedX;  
            wall.style.width = width + 'px';

          
        }

        // Move the wall
        x_pos -= speedX;
        wall.style.left = x_pos + 'px';

        
}


// Generate Random Gap
function generateRandomGap(wall,index){

    if(wall.lastElementChild){
        wall.removeChild(wall.lastElementChild);
    }

    // Random Pos and Height for gap
    GapHeight[index] = randomNumnerGenerate(minGapHeigth,maxGapHeigth);


    Gap[index] = randomNumnerGenerate(0,GameAreaHeight-GapHeight[index]);

    // Create Gap
    let empty = document.createElement('div');

    // Assign Gap position and height
    empty.style.height = String(GapHeight[index]) + 'px';  
    empty.style.top = String(Gap[index]) + 'px';

    // Assign class
    empty.classList.add('gap');

    // Append the gap to wall
    wall.appendChild(empty);


}

// Remove 'px'
function removePx(str){
    return Number(str.substring(0,        
        str.length-2));
}

// Random Number Generate
function randomNumnerGenerate(min,max){
    return (min + Math.floor(Math.random() * max));
}


// Gravity
function Gravity(bird,vel){

    let y_pos =  removePx(bird.style.top);
    y_pos += vel;
    bird.style.top = String(y_pos) + 'px';

    checkGame(y_pos);

}

function checkGame(y_pos){

    if(y_pos >= (GameAreaHeight-BirdHeight+15) || (y_pos <= -15)){
        endGame();
}
}

function checkWallandBirdPos(){

    BirdPosX = removePx(Bird.style.left);
    BirdPosy = removePx(Bird.style.top);

    for(let i = 0; i<3; i++){
        WallPosX = removePx(walls[i].style.left);
        GapPosY = Gap[i];
        GapH = GapHeight[i];


        if(BirdPosX == (WallPosX-BirdHeight+15)){
            if(!firstImpact){
    
                if((BirdPosy+55 >= GapPosY) && (BirdPosy+55<=GapPosY+GapH)){
                    score++
                    GameMessage.innerHTML = `Score : ${score}`;
                    return 0;
                }
                else{
                     endGame();
                }
    
            }
            firstImpact = false; 
        }

    }

}

// Clear All Child
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Function End Game
function endGame(){
    clearInterval(GravityInterval);
    clearInterval(BirdMoveInterval);
    MoveWallsInterval.forEach((item)=>{clearInterval(item);
    });

    removeAllChildNodes(GameArea);

    isGameRun = false;
    firstImpact = true;
    score = 0;

    GameMessage.innerHTML = `Please Press <strong>Enter</strong> to start Game`;
}


///////////////////////////////
// Function Definition