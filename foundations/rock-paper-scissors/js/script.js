const choices = ["rock", "paper", "scissors"];
const MESSAGE_WELCOME = "Welcome to Rock, Paper, Scissors!";
const MESSAGE_GOODBYE = "Thanks for playing!";
const QUESTION_CHOICE = "Rock, paper, or scissors?";
const QUESTION_PLAY_AGAIN = "Would you like to play again? (y/n)";
const ERROR_INVALID_INPUT = "Invalid input.";

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getHumanChoice() {
  let message = QUESTION_CHOICE;
  let choice;
  do {
    choice = prompt(message);
    if (choice === null) return null;

    choice = choice.trim().toLowerCase();
    if (!choices.includes(choice)) {
      message = `${ERROR_INVALID_INPUT} ${QUESTION_CHOICE}`;
    }
  } while (!choices.includes(choice));
  return choice;
}

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function playRound(humanChoice, computerChoice, outcomes, scores) {
  const result = outcomes[humanChoice][computerChoice];
  const humanChoiceCapitalised = capitalise(humanChoice);
  const computerChoiceCapitalised = capitalise(computerChoice);

  switch (result) {
    case "tie":
      console.log(`It's a tie, you both chose ${humanChoiceCapitalised}!`);
      break;
    case "win":
      console.log(
        `You won! ${humanChoiceCapitalised} beats ${computerChoiceCapitalised}!`
      );
      scores.human++;
      break;
    case "lose":
      console.log(
        `You lost! ${computerChoiceCapitalised} beats ${humanChoiceCapitalised}!`
      );
      scores.computer++;
      break;
  }
}

function displayScores(scores) {
  console.log(`You: ${scores.human}\nComputer: ${scores.computer}`);
}

function askPlayAgain() {
  let message = QUESTION_PLAY_AGAIN;
  let playAgain;
  do {
    playAgain = prompt(message);
    if (playAgain === null) return null;

    playAgain = playAgain.trim().toLowerCase();
    if (playAgain !== "y" && playAgain !== "n") {
      message = `${ERROR_INVALID_INPUT} ${QUESTION_PLAY_AGAIN}`;
    }
  } while (playAgain !== "y" && playAgain !== "n");
  return playAgain;
}

function playGame() {
  let playAgain;
  do {
    console.log(MESSAGE_WELCOME);

    const scores = { human: 0, computer: 0 };
    const rounds = 5;

    const outcomes = {
      rock: { rock: "tie", paper: "lose", scissors: "win" },
      paper: { rock: "win", paper: "tie", scissors: "lose" },
      scissors: { rock: "lose", paper: "win", scissors: "tie" },
    };

    for (let round = 1; round <= rounds; round++) {
      console.log(`Round #${round}`);
      console.log(QUESTION_CHOICE);
      const humanSelection = getHumanChoice();
      if (humanSelection === null) {
        console.log(MESSAGE_GOODBYE);
        return;
      }
      const computerSelection = getComputerChoice();
      playRound(humanSelection, computerSelection, outcomes, scores);
      displayScores(scores);
    }

    console.log("Game over!");
    if (scores.human > scores.computer) {
      console.log("You won!");
    } else if (scores.human < scores.computer) {
      console.log("You lost!");
    } else {
      console.log("It's a tie!");
    }

    playAgain = askPlayAgain();
  } while (playAgain === "y");

  console.log(MESSAGE_GOODBYE);
}

playGame();
