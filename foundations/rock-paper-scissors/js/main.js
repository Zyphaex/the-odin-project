const CHOICES = ["rock", "paper", "scissors"];
const MESSAGES = {
    INPUT_MESSAGE: "Enter your choice: rock, paper, or scissors (or 'exit' to quit)",
    INVALID_CHOICE: "Invalid choice. Please choose rock, paper, or scissors.",
    THANKS_FOR_PLAYING: "Thanks for playing!",
};

const WIN_CONDITIONS = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

function displayMessage(message){
    alert(message);
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
};

function getPlayerChoice() {
    while (true) {
        let playerChoice = prompt(MESSAGES.INPUT_MESSAGE);
        
        if (playerChoice === null || playerChoice.trim().toLowerCase() === "exit") {
            exitGame();
            return null;
        }
        
        playerChoice = playerChoice.trim().toLowerCase();
        
        if (!CHOICES.includes(playerChoice)) {
            displayMessage(MESSAGES.INVALID_CHOICE);
        } else {
            return playerChoice;
        }
    }
};

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (WIN_CONDITIONS[playerChoice] === computerChoice) {
        return `You win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}!`;
    } else {
        return `Computer wins! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice}!`;
    }
};

function displayResult(playerChoice, computerChoice, result) {
    const message = [
        `You chose ${playerChoice}.`,
        `Computer chose ${computerChoice}.`,
        result
    ].join('\n');
    displayMessage(message);
};

function exitGame() {
    displayMessage(MESSAGES.THANKS_FOR_PLAYING);
};

function playGame() {
    while (true) {
        const playerChoice = getPlayerChoice();

        if (!playerChoice) {
            break;
        }

        const computerChoice = getComputerChoice();
        const result = playRound(playerChoice, computerChoice);
        displayResult(playerChoice, computerChoice, result);
    }
};

playGame();