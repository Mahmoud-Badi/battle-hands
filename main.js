// game variables
let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
let gameActive = true;

const rockBtn = document.querySelector('[data-choice="rock"]');
const paperBtn = document.querySelector('[data-choice="paper"]');
const scissorsBtn = document.querySelector('[data-choice="scissors"]');
const pendingChoice = document.querySelector('.pending-choice');
const computerDisplay = document.querySelector('.computer-display');
const humanScoreElement = document.querySelector('.score-board .score-item:first-child .score');
const computerScoreElement = document.querySelector('.score-board .score-item:last-child .score');
const roundElement = document.querySelector('.round');

rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));

// computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let randomNum = Math.floor(Math.random() * 3);
    if (randomNum === 0) {
        return "rock";
    } else if (randomNum === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

// play a round
function playRound(humanChoice) {
    if (!gameActive) return;
    
    const computerChoice = getComputerChoice();
    currentRound++;
    
    // update the UI to show choices
    updateChoices(humanChoice, computerChoice);
    
    // determine round winner and show result
    let roundResult = "";
    let resultClass = "";
    
    if (humanChoice === computerChoice) {
        roundResult = "It's a tie!";
        resultClass = "tie";
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        roundResult = "You win!";
        resultClass = "win";
    } else {
        computerScore++;
        roundResult = "You lose!";
        resultClass = "lose";
    }
    
    showRoundResult(roundResult, resultClass);
    
    updateRound();
    
    setTimeout(() => {
        updateScore();
        hideRoundResult();
        
        if (currentRound >= 5) {
            endGame();
        }
    }, 1000); // one second to update score
}

// show round result
function showRoundResult(message, resultClass) {
    const roundResult = document.getElementById('roundResult');
    roundResult.textContent = message;
    roundResult.className = `round-result show ${resultClass}`;
}

function hideRoundResult() {
    const roundResult = document.getElementById('roundResult');
    roundResult.textContent = "Play to 5 rounds!";
    roundResult.className = "round-result";
}

// update the choice displays
function updateChoices(humanChoice, computerChoice) {
    const choiceEmojis = {
        'rock': '✊',
        'paper': '✋',
        'scissors': '✌️'
    };
    
    pendingChoice.textContent = choiceEmojis[humanChoice];
    computerDisplay.textContent = choiceEmojis[computerChoice];
}

// update the score display
function updateScore() {
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
}

// update the round display
function updateRound() {
    roundElement.textContent = `Round ${currentRound}`;
}

// end the game and show final result
function endGame() {
    gameActive = false;
    
    const modal = document.getElementById('endGameModal');
    const overlay = document.getElementById('overlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    // set modal content based on game result
    if (humanScore > computerScore) {
        modalTitle.textContent = "Victory! 🎉";
        modalMessage.textContent = "You won the game!";
    } else if (humanScore < computerScore) {
        modalTitle.textContent = "Defeat 😔";
        modalMessage.textContent = "You lost the game.";
    } else {
        modalTitle.textContent = "Draw 🤝";
        modalMessage.textContent = "It's a tie game!";
    }
    
    overlay.classList.add('active');
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
}

// restart the game
function restartGame() {
    humanScore = 0;
    computerScore = 0;
    currentRound = 0;
    gameActive = true;
    
    // reset UI
    pendingChoice.textContent = '❓';
    computerDisplay.textContent = '🤖';
    updateScore();
    updateRound();
    hideRoundResult();
    
    // hide modal
    const modal = document.getElementById('endGameModal');
    const overlay = document.getElementById('overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// play again
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    const playAgainBtn = document.getElementById('playAgainBtn');
    const overlay = document.getElementById('overlay');
    
    playAgainBtn.addEventListener('click', restartGame);
    overlay.addEventListener('click', restartGame);
});

// initialize the game
function initGame() {
    updateScore();
    updateRound();
    pendingChoice.textContent = '❓';
    computerDisplay.textContent = '🤖';
    
    const roundResult = document.getElementById('roundResult');
    roundResult.textContent = "Play to 5 rounds!";
    roundResult.className = "round-result";
}

// start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);