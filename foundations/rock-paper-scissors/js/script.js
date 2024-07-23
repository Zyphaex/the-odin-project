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

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function playRound(humanChoice, computerChoice, outcomes, scores) {
  const result = outcomes[humanChoice][computerChoice];
  const humanChoiceCapitalised = capitalise(humanChoice);
  const computerChoiceCapitalised = capitalise(computerChoice);

  switch (result) {
    case "tie":
      displayResult(`It's a tie, you both chose ${humanChoiceCapitalised}!`);
      break;
    case "win":
      displayResult(
        `You won! ${humanChoiceCapitalised} beats ${computerChoiceCapitalised}!`
      );
      scores.human++;
      break;
    case "lose":
      displayResult(
        `You lost! ${computerChoiceCapitalised} beats ${humanChoiceCapitalised}!`
      );
      scores.computer++;
      break;
  }
}

function displayScores(scores) {
  document.querySelector(
    ".score"
  ).innerText = `You: ${scores.human} Computer: ${scores.computer}`;
}

function displayResult(message) {
  document.querySelector(".result").innerText = message;
}

function playGame() {
  const scores = { human: 0, computer: 0 };
  const rounds = 5;

  const outcomes = {
    rock: { rock: "tie", paper: "lose", scissors: "win" },
    paper: { rock: "win", paper: "tie", scissors: "lose" },
    scissors: { rock: "lose", paper: "win", scissors: "tie" },
  };

  let round = 1;

  function playNextRound(humanSelection) {
    if (round > rounds) {
      if (scores.human > scores.computer) {
        displayResult("You won the game!");
      } else if (scores.human < scores.computer) {
        displayResult("You lost the game!");
      } else {
        displayResult("The game is a tie!");
      }
      return;
    }

    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection, outcomes, scores);
    displayScores(scores);
    round++;
  }

  document
    .getElementById("rock")
    .addEventListener("click", () => playNextRound("rock"));
  document
    .getElementById("paper")
    .addEventListener("click", () => playNextRound("paper"));
  document
    .getElementById("scissors")
    .addEventListener("click", () => playNextRound("scissors"));
}

document.addEventListener("DOMContentLoaded", () => {
  playGame();
});
