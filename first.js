// =================================
// ROCK PAPER SCISSORS
// =================================


// Scores

let playerScore = 0;
let computerScore = 0;


// Get HTML elements

const playerChoiceDisplay =
    document.getElementById("player-choice");

const computerChoiceDisplay =
    document.getElementById("computer-choice");

const resultDisplay =
    document.getElementById("result");

const scoreDisplay =
    document.getElementById("score");


// Emoji for each choice

const emojis = {

    rock: "✊",

    paper: "✋",

    scissors: "✌️"

};


// =================================
// PLAY GAME
// =================================

function playGame(playerChoice) {


    // Prevent the player from clicking
    // multiple times during the animation

    document.querySelectorAll(".choices button")
        .forEach(button => {
            button.disabled = true;
        });


    // Display player's choice

    playerChoiceDisplay.textContent =
        emojis[playerChoice];


    // Make player's hand move

    playerChoiceDisplay.classList.add("shake");


    // Computer starts shaking

    computerChoiceDisplay.textContent = "❔";

    computerChoiceDisplay.classList.add("shake");


    // Clear previous result

    resultDisplay.textContent =
        "Get ready...";


    resultDisplay.className = "";


    // Random computer choice

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];


    const computerChoice =
        choices[
            Math.floor(
                Math.random() * choices.length
            )
        ];


    // Wait before revealing computer choice

    setTimeout(function() {


        // Stop shaking

        playerChoiceDisplay.classList.remove(
            "shake"
        );

        computerChoiceDisplay.classList.remove(
            "shake"
        );


        // Show computer choice

        computerChoiceDisplay.textContent =
            emojis[computerChoice];


        // Work out winner

        let result;


        if (
            playerChoice === computerChoice
        ) {

            result = "It's a draw! 🤝";

            resultDisplay.className =
                "draw result-animation";

        }


        else if (

            (playerChoice === "rock" &&
                computerChoice === "scissors")

            ||

            (playerChoice === "paper" &&
                computerChoice === "rock")

            ||

            (playerChoice === "scissors" &&
                computerChoice === "paper")

        ) {

            result = "YOU WIN! 🎉";

            playerScore++;


            resultDisplay.className =
                "win result-animation";


            // Animate player hand

            playerChoiceDisplay.classList.add(
                "win-effect"
            );

        }


        else {

            result = "Computer wins! 🤖";

            computerScore++;


            resultDisplay.className =
                "lose result-animation";


            // Animate computer hand

            computerChoiceDisplay.classList.add(
                "win-effect"
            );
        }


        // Display result

        resultDisplay.textContent =
            result;


        // Update score

        scoreDisplay.textContent =
            "You: " +
            playerScore +
            " | Computer: " +
            computerScore;


        // Enable buttons again

        document.querySelectorAll(
            ".choices button"
        ).forEach(button => {

            button.disabled = false;

        });


        // Remove winning animation
        // after a short time

        setTimeout(function() {

            playerChoiceDisplay.classList.remove(
                "win-effect"
            );

            computerChoiceDisplay.classList.remove(
                "win-effect"
            );

        }, 1500);


    }, 1500);
}


// =================================
// RESET GAME
// =================================

function resetGame() {


    playerScore = 0;

    computerScore = 0;


    playerChoiceDisplay.textContent =
        "❔";

    computerChoiceDisplay.textContent =
        "❔";


    resultDisplay.textContent =
        "Choose your move!";


    resultDisplay.className = "";


    scoreDisplay.textContent =
        "You: 0 | Computer: 0";


    // Remove animations

    playerChoiceDisplay.classList.remove(
        "shake",
        "win-effect"
    );

    computerChoiceDisplay.classList.remove(
        "shake",
        "win-effect"
    );


    // Enable buttons

    document.querySelectorAll(
        ".choices button"
    ).forEach(button => {

        button.disabled = false;

    });
}
