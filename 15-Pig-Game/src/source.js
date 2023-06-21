// Open Strict Mode
"use strict";

/////////////////////////
// Parameter Define

// Players
let Player1Dom = document.querySelector(".player--0");
let Player2Dom = document.querySelector(".player--1");

// Scores
let score1Dom = document.querySelector("#score--0");
let score2Dom = document.querySelector("#score--1");

// Dice
let diceDom = document.querySelector(".dice");

// Buttons
let newGameBtn = document.querySelector(".btn--new");
let rollBtn = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");

// Current Player
let currentPlayer = "Player1";

// Current Score
let currentScore1 = document.querySelector("#current--0");
let currentScore2 = document.querySelector("#current--1");

// Game status
let gameStatus = true;

// Game Score Finish
const endGameScore = 100;

// Parameter Define
/////////////////////////

startGame();

////////////////////////
// Functions

// (Re)-Start Game
function startGame() {
  // Reset scores
  score1Dom.textContent = 0;
  score2Dom.textContent = 0;

  // Reset Current Score
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  // Hidden dice
  diceDom.classList.add("hidden");

  // Assign Current Player
  if (currentPlayer == "Player2") {
    Player1Dom.classList.add("player--active");
    Player2Dom.classList.remove("player--active");
    currentPlayer = "Player1";
  }

  // Restart Style
  if (Player1Dom.classList.contains("player--winner")) {
    Player1Dom.classList.remove("player--winner");
  }
  if (Player2Dom.classList.contains("player--winner")) {
    Player2Dom.classList.remove("player--winner");
  }

  // Start Game
  gameStatus = true;
}

// Switch Player
function switchPlayer() {
  if (currentPlayer == "Player1") {
    Player1Dom.classList.remove("player--active");
    Player2Dom.classList.add("player--active");
    currentPlayer = "Player2";
  } else {
    Player2Dom.classList.remove("player--active");
    Player1Dom.classList.add("player--active");
    currentPlayer = "Player1";
  }
}

function rollDice(currentScore) {
  let diceNumber = Math.floor(Math.random() * 6 + 1);
  if (diceDom.classList.contains("hidden")) {
    diceDom.classList.remove("hidden");
  }
  diceDom.src = "src/img/dice-" + String(diceNumber) + ".png";

  if (diceNumber == 1) {
    currentScore.textContent = 0;
    switchPlayer();
  } else {
    let score = Number(currentScore.textContent) + diceNumber;
    currentScore.textContent = score;
  }
}

function holdBtnfunc(currentScore, playerScore, player) {
  let score =
    Number(currentScore.textContent) + Number(playerScore.textContent);
  playerScore.textContent = score;
  currentScore.textContent = 0;

  if (score >= endGameScore) {
    finishGame(player);
  }
}

function finishGame(player) {
  player.classList.add("player--winner");
  gameStatus = false;
}

// Event Functions

// Roll Dice
rollBtn.addEventListener("click", function () {
  if (!gameStatus) {
    return 0;
  }
  currentPlayer == "Player1"
    ? rollDice(currentScore1)
    : rollDice(currentScore2);
});

// Hold
holdBtn.addEventListener("click", function () {
  if (!gameStatus) {
    return 0;
  }
  currentPlayer == "Player1"
    ? holdBtnfunc(currentScore1, score1Dom, Player1Dom)
    : holdBtnfunc(currentScore2, score2Dom, Player2Dom);

  switchPlayer();
});

// New Game
newGameBtn.addEventListener("click", function () {
  startGame();
});

// Functions
////////////////////////
