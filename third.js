// ==============================
// GAMEZY SNAKE
// ==============================

const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

const startButton = document.getElementById("start-button");

const message = document.getElementById("game-message");


// ==============================
// GAME SETTINGS
// ==============================

const gridSize = 20;

const tileCount = canvas.width / gridSize;


// ==============================
// GAME VARIABLES
// ==============================

let snake;

let food;

let direction;

let nextDirection;

let score = 0;

let highScore = 0;

let gameRunning = false;

let gameLoop;

let speed = 80;


// ==============================
// START GAME
// ==============================

function startGame() {

    clearInterval(gameLoop);

    snake = [
        {
            x: 10,
            y: 10
        },
        {
            x: 9,
            y: 10
        },
        {
            x: 8,
            y: 10
        }
    ];

    direction = {
        x: 1,
        y: 0
    };

    nextDirection = {
        x: 1,
        y: 0
    };

    score = 0;

    speed = 80;

    gameRunning = true;

    scoreDisplay.textContent = score;

    message.classList.add("hidden");

    startButton.textContent = "🔄 RESTART";

    createFood();

    draw();

    gameLoop = setInterval(update, speed);
}


// ==============================
// UPDATE GAME
// ==============================

function update() {

    direction = nextDirection;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };


    // Check wall collision

    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {

        endGame();

        return;
    }


    // Check snake collision

    for (let i = 0; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {

            endGame();

            return;
        }
    }


    // Add new head

    snake.unshift(head);


    // Check food

    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        score++;

        scoreDisplay.textContent = score;

        createFood();

        // Increase speed

        if (speed > 55) {

            speed -= 5;

            clearInterval(gameLoop);

            gameLoop = setInterval(update, speed);
        }

    } else {

        // Remove tail

        snake.pop();
    }


    draw();
}


// ==============================
// DRAW GAME
// ==============================

function draw() {

    // Background

    ctx.fillStyle = "#17202a";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Grid

    ctx.strokeStyle =
        "rgba(255,255,255,0.04)";

    for (
        let i = 0;
        i < tileCount;
        i++
    ) {

        ctx.beginPath();

        ctx.moveTo(
            i * gridSize,
            0
        );

        ctx.lineTo(
            i * gridSize,
            canvas.height
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            0,
            i * gridSize
        );

        ctx.lineTo(
            canvas.width,
            i * gridSize
        );

        ctx.stroke();
    }


    // Food

    drawFood();


    // Snake

    snake.forEach(
        (segment, index) => {

            if (index === 0) {

                ctx.fillStyle = "#06d6a0";

            } else {

                ctx.fillStyle = "#08b889";
            }


            ctx.beginPath();

            ctx.roundRect(
                segment.x * gridSize + 2,
                segment.y * gridSize + 2,
                gridSize - 4,
                gridSize - 4,
                6
            );

            ctx.fill();


            // Snake eyes

            if (index === 0) {

                ctx.fillStyle = "white";

                const eyeSize = 3;

                let eyeX =
                    segment.x * gridSize + 6;

                let eyeY =
                    segment.y * gridSize + 6;


                ctx.beginPath();

                ctx.arc(
                    eyeX,
                    eyeY,
                    eyeSize,
                    0,
                    Math.PI * 2
                );

                ctx.fill();


                ctx.beginPath();

                ctx.arc(
                    eyeX + 8,
                    eyeY,
                    eyeSize,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

        }
    );
}


// ==============================
// FOOD
// ==============================

function drawFood() {

    const centerX =
        food.x * gridSize + gridSize / 2;

    const centerY =
        food.y * gridSize + gridSize / 2;


    ctx.fillStyle = "#ff6b6b";


    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Food glow

    ctx.strokeStyle =
        "rgba(255,107,107,0.4)";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        10,
        0,
        Math.PI * 2
    );

    ctx.stroke();
}


// ==============================
// CREATE FOOD
// ==============================

function createFood() {

    let validPosition = false;

    while (!validPosition) {

        food = {

            x: Math.floor(
                Math.random() * tileCount
            ),

            y: Math.floor(
                Math.random() * tileCount
            )
        };


        validPosition = !snake.some(
            segment =>
                segment.x === food.x &&
                segment.y === food.y
        );
    }
}


// ==============================
// CHANGE DIRECTION
// ==============================

function changeDirection(newDirection) {

    if (!gameRunning) {
        return;
    }


    // Prevent reversing

    if (
        newDirection === "up" &&
        direction.y !== 1
    ) {

        nextDirection = {
            x: 0,
            y: -1
        };
    }


    if (
        newDirection === "down" &&
        direction.y !== -1
    ) {

        nextDirection = {
            x: 0,
            y: 1
        };
    }


    if (
        newDirection === "left" &&
        direction.x !== 1
    ) {

        nextDirection = {
            x: -1,
            y: 0
        };
    }


    if (
        newDirection === "right" &&
        direction.x !== -1
    ) {

        nextDirection = {
            x: 1,
            y: 0
        };
    }
}


// ==============================
// KEYBOARD CONTROLS
// ==============================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowUp" ||
            event.key === "w"
        ) {

            event.preventDefault();

            changeDirection("up");
        }


        if (
            event.key === "ArrowDown" ||
            event.key === "s"
        ) {

            event.preventDefault();

            changeDirection("down");
        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "a"
        ) {

            event.preventDefault();

            changeDirection("left");
        }


        if (
            event.key === "ArrowRight" ||
            event.key === "d"
        ) {

            event.preventDefault();

            changeDirection("right");
        }
    }
);


// ==============================
// MOBILE CONTROLS
// ==============================

document
    .querySelectorAll(
        "[data-direction]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                changeDirection(
                    button.dataset.direction
                );

            }
        );

    });


// ==============================
// GAME OVER
// ==============================

function endGame() {

    gameRunning = false;

    clearInterval(gameLoop);


    if (score > highScore) {

        highScore = score;

        highScoreDisplay.textContent =
            highScore;
    }


    message.innerHTML = `
        <h2>💥 Game Over!</h2>
        <p>You scored ${score} points!</p>
    `;


    message.classList.remove("hidden");


    startButton.textContent =
        "🔄 PLAY AGAIN";
}


// ==============================
// START BUTTON
// ==============================

startButton.addEventListener(
    "click",
    startGame
);


// ==============================
// INITIAL SCREEN
// ==============================

snake = [
    {
        x: 10,
        y: 10
    },
    {
        x: 9,
        y: 10
    },
    {
        x: 8,
        y: 10
    }
];

food = {
    x: 15,
    y: 10
};

draw();
