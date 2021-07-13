const submitButton = document.getElementById('submitButton')
const playAgainButton = document.getElementById('playAgain')
const guessInput = document.getElementById('guessInput')

const guesses = document.getElementById('guesses')
const lowOrHigh = document.getElementById('lowOrHigh')
const turnsLeft = document.getElementById('turnsLeft')
const warning = document.getElementById('warning')


var randomNumber = Math.floor(Math.random() * 101);
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
    toggleButtons('submit');
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
    toggleButtons('submit');
  } else {
    turnsLeft.innerText = `Turns left: ${guessCount}`
  }
}

function reset () {
  document.location.href = ''
}

function toggleButtons () {
  if (submitButton.style.display = 'inline-block') {
    submitButton.style.display = 'none'
    playAgainButton.style.display = 'inline-block'
  } else {
  submitButton.style.display = 'inline-block'
  playAgainButton.style.display = 'none'
}
}

submitButton.addEventListener('click', button => {
  logGuess()
})

playAgainButton.addEventListener('click', button => {
  reset()
})
