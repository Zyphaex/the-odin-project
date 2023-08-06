const CHOICES = ["rock", "paper", "scissors"];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

function getPlayerChoice() {
    let playerChoice = prompt("Enter your choice: rock, paper, or scissors (or 'exit' to quit)");
    if (playerChoice === null) {
        alert("Thanks for playing!");
        return null;
    }
    
    playerChoice = playerChoice.trim().toLowerCase();
    
    if (playerChoice === "exit") {
        alert("Thanks for playing!");
        return null;
    } else if (!CHOICES.includes(playerChoice)) {
        alert("Invalid choice. Please choose rock, paper, or scissors.");
        return getPlayerChoice();
    }
    return playerChoice;
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

function playGame() {
    while (true) {
        const playerChoice = getPlayerChoice();

        if (!playerChoice) {
            break;
        }

        const computerChoice = getComputerChoice();
        const result = playRound(playerChoice, computerChoice);
        const message = [
            `You chose ${playerChoice}.`,
            `Computer chose ${computerChoice}.`,
            result
        ].join('\n');

        alert(message);
    }
}

playGame();