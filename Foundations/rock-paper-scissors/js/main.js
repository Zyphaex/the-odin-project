const CHOICES = ["rock", "paper", "scissors"];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

function getUserChoice() {
    let choice = prompt("Enter your choice: rock, paper, or scissors (or 'exit' to quit)");
    if (choice === null) {
        alert("Thanks for playing!");
        return null;
    }
    
    choice = choice.toLowerCase();
    
    if (choice === "exit") {
        alert("Thanks for playing!");
        return null;
    } else if (!CHOICES.includes(choice)) {
        alert("Invalid choice. Please choose rock, paper, or scissors.");
        return getUserChoice();
    }
    return choice;
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

function playRPS() {
    while (true) {
        const playerChoice = getUserChoice();

        if (!playerChoice) {
            break;
        }

        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        const message = [
            `You chose ${playerChoice}.`,
            `Computer chose ${computerChoice}.`,
            result
        ].join('\n');

        alert(message);
    }
}

playRPS();