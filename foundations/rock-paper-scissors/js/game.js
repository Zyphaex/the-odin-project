const CHOICES = ["rock", "paper", "scissors"];
const MESSAGES = {
    INVALID_CHOICE: "Invalid choice. Please choose rock, paper, or scissors.",
    THANKS_FOR_PLAYING: "Thanks for playing!",
    TIE: "It's a tie!",
    PLAYER_WIN: "You win!",
    COMPUTER_WIN: "Computer wins!",
};
const WIN_CONDITIONS = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

let playerScore = 0;
let computerScore = 0;

// DOM Elements
const resultElement = document.createElement("section");
resultElement.id = "result";

const playerScoreElement = createScoreElement("You: ");
const computerScoreElement = createScoreElement("Computer: ");

const playAgainButton = createPlayAgainButton();

const main = createMain();

// Helper Functions
function createScoreElement(label) {
    const scoreElement = document.createElement("span");
    scoreElement.textContent = "0";
    const scoreSection = document.createElement("section");
    scoreSection.appendChild(document.createTextNode(label));
    scoreSection.appendChild(scoreElement);
    scoreSection.appendChild(document.createElement("br"));
    return { scoreElement, scoreSection };
}

function createMain() {
    const mainElement = document.createElement("main");
    for (const choice of CHOICES) {
        const button = createButton(choice);
        button.appendChild(createImage(`images/${choice}.png`));
        mainElement.appendChild(button);
    }
    mainElement.appendChild(playerScoreElement.scoreSection);
    mainElement.appendChild(computerScoreElement.scoreSection);
    mainElement.appendChild(resultElement);
    mainElement.appendChild(playAgainButton);
    return mainElement;
}

function createButton(choice) {
    const button = document.createElement("button");
    button.id = choice;
    button.addEventListener("click", () => playGame(choice));
    return button;
}

function createImage(src) {
    const img = document.createElement("img");
    img.src = src;
    return img;
}

function createPlayAgainButton() {
    const button = document.createElement("button");
    button.id = "play-again";
    button.textContent = "Play Again";
    button.style.display = "none";
    button.style.margin = "auto";
    button.addEventListener("click", resetGame);
    return button;
}

function displayResult(playerChoice, computerChoice, result) {
    const message = `You chose ${playerChoice}.<br>Computer chose ${computerChoice}.<br>${result}`;
    resultElement.innerHTML = message;
}

function updateScoreDisplay() {
    playerScoreElement.scoreElement.textContent = playerScore;
    computerScoreElement.scoreElement.textContent = computerScore;

    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function endGame() {
    disableButtons();
    playAgainButton.style.display = "block";
}

function disableButtons() {
    for (const choice of CHOICES) {
        document.getElementById(choice).disabled = true;
    }
}

function enableButtons() {
    for (const choice of CHOICES) {
        document.getElementById(choice).disabled = false;
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return MESSAGES.TIE;
    } else if (WIN_CONDITIONS[playerChoice] === computerChoice) {
        playerScore++;
        return MESSAGES.PLAYER_WIN;
    } else {
        computerScore++;
        return MESSAGES.COMPUTER_WIN;
    }
}

function playGame(playerChoice) {
    if (!CHOICES.includes(playerChoice)) {
        resultElement.innerHTML = MESSAGES.INVALID_CHOICE;
        return;
    }

    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const result = playRound(playerChoice, computerChoice);
    displayResult(playerChoice, computerChoice, result);
    updateScoreDisplay();
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playAgainButton.style.display = "none";
    updateScoreDisplay();
    resultElement.innerHTML = "";
    enableButtons();
}

document.body.appendChild(main);
