const CHOICES = ["rock", "paper", "scissors"];
const MESSAGES = {
    INVALID_CHOICE: "Invalid choice. Please choose rock, paper, or scissors.",
    THANKS_FOR_PLAYING: "Thanks for playing!",
};

const WIN_CONDITIONS = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

function displayResult(playerChoice, computerChoice, result) {
    const message = [
        `You chose ${playerChoice}.`,
        `Computer chose ${computerChoice}.`,
        result
    ].join('<br>');
    document.getElementById("result").innerHTML = message;
}

let playerScore = 0;
let computerScore = 0;

function updateScoreDisplay() {
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;

    if (playerScore === 5 || computerScore === 5) {
        endGame()
    }
}

function endGame() {
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
    document.getElementById("play-again").style.display = "block";
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (WIN_CONDITIONS[playerChoice] === computerChoice) {
        playerScore++;
        updateScoreDisplay();
        return `You win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}!`;
    } else {
        computerScore++;
        updateScoreDisplay();
        return `Computer wins! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice}!`;
    }
}

function playGame(playerChoice) {
    if (!CHOICES.includes(playerChoice)) {
        document.getElementById("result").innerHTML = MESSAGES.INVALID_CHOICE;
        return;
    }

    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const result = playRound(playerChoice, computerChoice);
    displayResult(playerChoice, computerChoice, result);
}

document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));
document.getElementById("play-again").addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    document.getElementById("play-again").style.display = "none";
    updateScoreDisplay();
    document.getElementById("result").innerHTML = "";
    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissors").disabled = false;
});