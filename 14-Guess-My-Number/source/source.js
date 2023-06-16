// Get Parameters
const againBtn = document.querySelector(".again");
const secretNumber = document.querySelector(".number");
const checkBtn = document.querySelector(".check");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");
const guess = document.querySelector(".guess");

const body = document.querySelector("body");

// Define Parameter
let scoreNumber = 20;
let highScoreNumber = 0;
let randomNumber = null;

// Start Function

function startGame() {
  body.style.backgroundColor = "#222";
  scoreNumber = 20;
  randomNumber = Math.floor(Math.random() * 20 + 1);
  secretNumber.textContent = "?";
  message.textContent = "Start guessing...";
  score.textContent = 20;
  highScore.textContent = highScoreNumber;
  guess.value = null;
}

// Check Btn Event
checkBtn.addEventListener("click", function () {
  const guessValue = Number(guess.value);

  if (!scoreNumber) {
    return 0;
  }

  if (!guessValue) {
    setMessage("Plase enter a number");
    return 0;
  }

  if (guessValue === randomNumber) {
    setMessage("Correct 👍👌");

    if (highScoreNumber < scoreNumber) {
      highScoreNumber = scoreNumber;
    }
    highScore.textContent = highScoreNumber;
    body.style.backgroundColor = "#228B22";

    return 0;
  }

  let msg = guessValue > randomNumber ? "Too high 📈" : "Too low 📉";
  setMessage(msg);
  scoreNumber--;
  score.textContent = scoreNumber;

  if (scoreNumber <= 0) {
    setMessage("You Lost Try Again ... ");
    body.style.backgroundColor = "#800000";
  }
});

// Again Btn Event
againBtn.addEventListener("click", function () {
  startGame();
});

// Set Message
function setMessage(msg) {
  message.textContent = msg;
}

// Start Game
startGame();
