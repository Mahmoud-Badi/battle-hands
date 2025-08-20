// Battle Hands Game logic


// get computer choice
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

// get human choice
function getHumanChoice() {
    let userInput = prompt("Enter your choice: r for rock, p for paper, s for scissors");
    let userChoice = userInput.toLowerCase();
    if (userChoice === "r") {
        return "rock";
    } else if (userChoice === "p") {
        return "paper";
    } else if (userChoice === "s") {
        return "scissors";
    } else {
        return "invalid choice";
    }
}

// game rounds logic
function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    // play round
    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            return "It's a tie!";
        } else if (humanChoice === "rock" && computerChoice === "scissors") {
            humanScore++;
            return "You win! Rock beats scissors";
        } else if (humanChoice === "paper" && computerChoice === "rock") {
            humanScore++;
            return "You win! Paper beats rock";
        } else if (humanChoice === "scissors" && computerChoice === "paper") {
            humanScore++;
            return "You win! Scissors beats paper";
        } else {
            computerScore++;
            return "You lose! " + computerChoice + " beats " + humanChoice;
        }
    }

    for (let i=0; i<5; i++) {
        let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        let result = playRound(humanChoice, computerChoice);
        console.log(result);
        console.log("Human score: " + humanScore);
        console.log("Computer score: " + computerScore);
    }

    if (humanScore > computerScore) {
        console.log("You win the game!");
    } else if (humanScore < computerScore) {
        console.log("You lose the game!");
    } else {
        console.log("It's a tie game!");
    }
}

// play game
playGame();