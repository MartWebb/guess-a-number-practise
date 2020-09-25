// Global DOM variables
const easyBtn = document.querySelector('.easy');
const hardBtn = document.querySelector('.hard');
const guessInput = document.querySelector('.guess');
const message = document.querySelector('.message');
const difficultyBoard = document.querySelector('.difficulty');
const gameBoard = document.querySelector('.game-board');
const attemptsTaken = document.querySelector('.attempts-taken');
const couldNotGuess = document.querySelector('.could-not-guess');
const newGameBtn = document.querySelector('.new-game');
const currentRange = document.querySelector('.current-range');
const lowRange = document.querySelector(".low-range");
const midRange = document.querySelector(".mid-range");
const highRange = document.querySelector(".high-range");
const lastGuessDisplay = document.querySelector(".last-guess")

// Global variables
let count = 0;
let lowNumber = 0;
let highNumber = 100;
let lastGuessArray = [];
let playerGuess;

// Listener for easy mode
easyBtn.addEventListener('click', () => {
    difficultyBoard.style.display = "none";
    gameBoard.style.display = "block";
    startGame(10);
})

// Listener for hard mode
hardBtn.addEventListener('click', () => {
    difficultyBoard.style.display = "none";
    gameBoard.style.display = "block";
    startGame(5);
})

// Tracks the player guesses for the range bar
function rangeChange() { 
    // Keeps the Current Range inline with the Mid Range
    currentRange.textContent = `${lowNumber} - ${highNumber}`;
     currentRange.style.padding = 0;
    currentRange.style.marginLeft = `${lowNumber}%`;
    currentRange.style.marginRight = `${100 - highNumber}%`;
    //currentRange.classList.add("blinker");
    // Use flex basis to set length of flexible property
    lowRange.style.flex = `${lowNumber}%`;
    lowRange.style.background = "#ef7b54";
  
    midRange.style.flex = `${highNumber - lowNumber}%`;
    midRange.style.background = "#83e1d0";
  
    if (highNumber === 100) highRange.style.flex = 0;
    highRange.style.flex = `${100 - highNumber}%`;
    highRange.style.background = "#ef7b54";
  }

//   
const startGame = (attempts) => {
    const computerGuess = Math.round(Math.random() * 100) + 1;
    console.log("computer " + computerGuess);

    // Listens for user guess
    guessInput.addEventListener('change', (event) => {
        count++
        attempts--
        playerGuess = event.target.value;
        lastGuessArray.push(`${playerGuess} `);
        lastGuessDisplay.textContent = lastGuessArray;
        guessInput.value = '';

        // Says if the guess is too high or too low
        if (playerGuess > computerGuess) {
             if (playerGuess <= 100) highNumber = playerGuess;
             message.textContent = "Too High!"; 
        } else  {
            if (playerGuess >= 0) lowNumber = playerGuess;
            message.textContent ="Too Low!";
        } 
          
        attemptsTaken.textContent = count;
        // Decides win  or lose
        if (attempts === 0) {
            youLose(computerGuess)
        } else if (parseInt(playerGuess) === computerGuess) {
            youWin(attempts)
        }
        rangeChange()
    })
    
}


const youLose = (computerGuess) => {
    message.textContent = "You Lose!"
    couldNotGuess.textContent = `The number was ${computerGuess}`;
    guessInput.setAttribute("readonly", "readonly"); 
    newGameBtn.style.display = "initial";
    //clearValues();
}

const youWin = (attempts) => {
    message.textContent = "You Win!"
    guessInput.setAttribute("readonly", "readonly"); 
    couldNotGuess.textContent = `In ${attempts} Guesses`;
    newGameBtn.style.display = "initial";
     //clearValues();
}

const clearValues = () => {
    guessInput.removeAttribute('readonly');
    attemptsTaken.textContent = 0;
    highRange.style.flex = 0;
    lowRange.style.flex = 0;
    currentRange.textContent = `${1} - ${100}`;
    message.textContent = "Your Guess: "
    lastGuessArray = [];
    lastGuessDisplay.textContent = '';
}

newGameBtn.addEventListener('click', () => {
    //currentRange.classList.remove("blinker");
    window.location.reload();
    
    //difficultyBoard.style.display = "block";
    //gameBoard.style.display = "none";
})