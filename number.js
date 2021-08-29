const submitButton = document.getElementById('submitButton')
const playAgainButton = document.getElementById('playAgain')
const guessInput = document.getElementById('guessInput')

const guesses = document.getElementById('guesses')
const lowOrHigh = document.getElementById('lowOrHigh')
const turnsLeft = document.getElementById('turnsLeft')
const warning = document.getElementById('warning')

var randomNumber = Math.floor(Math.random() * 100) +1;
var guessCount = 7
var alreadyGuessed = []

function logGuess() {
  let userGuess = guessInput.value
  console.log(randomNumber)
  if (isNaN(userGuess) || (userGuess > 100) || (userGuess < 1) || userGuess.includes('.')) {
    warning.innerText = 'Incorrect input. Please enter a number between 1 and 100.'
    lowOrHigh.innerText = ''
    return
  }
  if (1 <= userGuess <= 100) {
    alreadyGuessed.push(guessInput.value);
    guesses.innerText = `Previous guesses: ${alreadyGuessed.join(', ')}`
    warning.innerText = ''
    isWin();
    turnTracker();
  }
  guessInput.value = ''
}


function isWin () {
  let userGuess = guessInput.value
  if (userGuess == randomNumber) {
    lowOrHigh.innerText = `You guessed right! The correct number was ${randomNumber}.`
    turnsLeft.innerText = ''
    displayButtons(playAgainButton, submitButton);
  } else if (userGuess > randomNumber) {
    lowOrHigh.innerText = `Your guess was too high! Try again.`
  } else {
    lowOrHigh.innerText = `Your guess was too low! Try again.`
  }
}

function turnTracker () {
  let userGuess = guessInput.value
  guessCount--
  if (guessCount >= 0 && userGuess == randomNumber) {
    turnsLeft.innerText = ''
  } else if (guessCount === 0) {
    lowOrHigh.innerText = `Game over! You ran out of turns. The number was ${randomNumber}.`
    turnsLeft.innerText = ''
    guessInput.disabled = true;
    displayButtons(playAgainButton, submitButton);
  } else {
    turnsLeft.innerText = `Turns left: ${guessCount}`
  }
}

function setup () {
  randomNumber = Math.floor(Math.random() * 100) +1;
  guessCount = 7
  alreadyGuessed = []
  guessInput.disabled = false;
  turnsLeft.innerText = ''
  lowOrHigh.innerText = ''
  guesses.innerText = ''
}

function displayButtons (display, hide) {
    display.style.display = 'inline-block'
    hide.style.display = 'none'
}

submitButton.addEventListener('click', button => {
  logGuess()
})

playAgainButton.addEventListener('click', button => {
  setup()
  displayButtons(submitButton, playAgainButton);
})

document.addEventListener('keydown', logKey => {
    var x = event.keyCode
    if (x == 13 && guessInput.disabled == false) {
      logGuess()
    } else {
      return
    }
})
