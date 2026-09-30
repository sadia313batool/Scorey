// ----------------------------------
// TIC-TAC-TOE GAME
// ----------------------------------


// The game board
let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


// The player whose turn it is
let currentPlayer = "X";


// Keeps track of whether the game has finished
let gameOver = false;


// Get all the cells from the HTML
const cells = document.querySelectorAll(".cell");


// Get the message from the HTML
const message = document.getElementById("message");


// ----------------------------------
// MAKE A MOVE
// ----------------------------------

function makeMove(index) {

    // Don't allow a move if:
    // 1. The square is already occupied
    // 2. The game is finished

    if (board[index] !== "" || gameOver) {
        return;
    }


    // Put the current player's symbol
    // into the board

    board[index] = currentPlayer;


    // Display the symbol on the screen

    cells[index].textContent = currentPlayer;


    // Add the animation

    cells[index].classList.add("placed");


    // Check if the player has won

    if (checkWinner()) {

        message.textContent =
            "Player " + currentPlayer + " wins! 🎉";


        // Add winning message animation

        message.classList.add("winner");


        // Stop the game

        gameOver = true;


        // Animate the winning cells

        animateWinner();


        return;
    }


    // Check if there are no empty spaces

    if (!board.includes("")) {

        message.textContent =
            "It's a draw! 🤝";


        message.classList.add("draw-message");


        gameOver = true;


        return;
    }


    // Change player

    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";
    }


    // Update the message

    message.textContent =
        "Player " + currentPlayer + "'s turn";
}


// ----------------------------------
// CHECK FOR WINNER
// ----------------------------------

function checkWinner() {


    // All possible winning combinations

    const winningCombinations = [

        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];


    // Check every combination

    for (let combination of winningCombinations) {

        const a = combination[0];

        const b = combination[1];

        const c = combination[2];


        // Check whether all three spaces
        // contain the same player

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {


            // Highlight the winning cells

            cells[a].classList.add("winning-cell");

            cells[b].classList.add("winning-cell");

            cells[c].classList.add("winning-cell");


            return true;
        }
    }


    // No winner

    return false;
}


// ----------------------------------
// WINNING ANIMATION
// ----------------------------------

function animateWinner() {

    cells.forEach(function(cell) {

        if (
            cell.classList.contains("winning-cell")
        ) {

            cell.classList.add(
                "winner-animation"
            );
        }

    });
}


// ----------------------------------
// RESET GAME
// ----------------------------------

function resetGame() {


    // Clear the board

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    // Player X starts again

    currentPlayer = "X";


    // Game is no longer finished

    gameOver = false;


    // Remove everything from the cells

    cells.forEach(function(cell) {

        cell.textContent = "";


        // Remove animations

        cell.classList.remove(
            "placed",
            "winning-cell",
            "winner-animation"
        );
    });


    // Remove message animations

    message.classList.remove(
        "winner",
        "draw-message"
    );


    // Reset message

    message.textContent =
        "Player X's turn";
}