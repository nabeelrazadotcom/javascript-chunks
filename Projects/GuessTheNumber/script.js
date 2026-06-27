let randomNum = parseInt(Math.random() * 100 + 1);
let userInput = document.querySelector("#guessField");
let submit = document.querySelector("#subt");
let guessSlot = document.querySelector(".guesses");
let remaining = document.querySelector(".lastResult");
let result = document.querySelector(".lowOrHi");

let prevGuess = [];
let numGuess = 1;

let startOver = document.createElement("button");
startOver.innerHTML = "Start Again";
startOver.classList.add('startOver', 'btn', 'btn-primary');

const credit = document.createElement('p');
credit.innerHTML = 'Developed by Raosaab'
credit.classList.add('text-dark', 'text-center', 'game-credit')
document.querySelector('.resultParas').appendChild(credit)

let playGame = true; // Main Variable

const guessLabel = document.querySelector("#guess");

submit.addEventListener("click", function (e) {
  if (playGame) {
    e.preventDefault();
    let guess = parseInt(userInput.value);
    validateInput(guess);
  }
});

function validateInput(guess) {
  if (numGuess == 11) {
      setGuessState("You Lose!", "lose");
      result.innerHTML = ''
    endGame();
  } else {
    if (guess > 100 || guess < 0) {
      displayMessage(`Enter a number in the range 1-100! (${guess})`);
    } else if (isNaN(guess)) {
      displayMessage(`Enter a valid Number! (${guess})`);
    } else {
      prevGuess.push(guess);
      numGuess++;
      remaining.innerHTML--;
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNum) {
    displayMessage(`You Nailed it! ✌🎉`);
    setGuessState("You Won!", "win");
    endGame();
  } else if (guess > randomNum) {
    displayMessage(`Your Number is too bigger!!`);
    displayGuess(guess);
  } else if (guess < randomNum) {
    displayMessage(`Think some bigger number!!`);
    displayGuess(guess);
  }
}

function displayMessage(message) {
  result.innerHTML = message;
  userInput.value = "";
}

function displayGuess(guess) {
  guessSlot.innerHTML = prevGuess.join(", ");
  guess = "";
}

function setGuessState(text, state) {
  guessLabel.classList.remove("is-win", "is-lose");
  guessLabel.innerHTML = text;

  if (!state) {
    return;
  }

  // Force a reflow so the same animation can replay on consecutive games.
  void guessLabel.offsetWidth;
  guessLabel.classList.add(state === "win" ? "is-win" : "is-lose");
}

function endGame() {
  userInput.value = "";
  userInput.toggleAttribute("disabled");
    submit.toggleAttribute("hidden");
    
  document.querySelector("form").appendChild(startOver);
  playGame = false;
  startOver.addEventListener("click", function () {
    newGame();
  });
}

function newGame() {
  randomNum = parseInt(Math.random() * 100 + 1);
  userInput.toggleAttribute("disabled");
  document.querySelector("form").removeChild(startOver);
  submit.toggleAttribute("hidden");
  prevGuess = [];
  guessSlot.innerHTML = "None yet";
  numGuess = 1;
  remaining.innerHTML = 10;
  result.innerHTML = "";
  setGuessState("Make your guess");

  playGame = true;
}
