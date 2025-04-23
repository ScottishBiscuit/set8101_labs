// Get the canvas and drawing context
//https://www.youtube.com/watch?v=uyhzCBEGaBY This video provided be freeCodeCamp.org helped me develop the snake game. A lot of code from this video is used in this project.
// I also used the following website to help me understand how to use the canvas https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Set up the game grid and box size
const box = 20;
const rows = Math.floor(canvas.width / box);

// Snake starting position
let snake = [{ x: 5, y: 5 }];
let direction = "RIGHT";

//Randomly places the first food
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * rows)
};

// Waits for input from user to give the snake a direcction 
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Draw the game every 100 miliseconds, can also slow and increase the speed
setInterval(drawGame, 100);

function drawGame() {
    // Clears the previous frame
    ctx.fillStyle = "#fdf3e7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draws each part of the snake
    ctx.fillStyle = "green";
    snake.forEach((part) => {
        ctx.fillRect(part.x * box, part.y * box, box, box);
    });

    // Moves the snake by creating a new head and checkin the direction
    const head = { ...snake[0] };

    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    // handles if the snake hits the wall
if (
    head.x < 0 || head.y < 0 ||
    head.x >= rows || head.y >= rows
) {
    playTryAgainSound(); // Plays the try again sound if hits wall
    alert("Game Over!");
    snake = [{ x: 5, y: 5 }]; // Resets the snake
    direction = "RIGHT"; // Gives it a direction on restart
    return;
}

// handles when the snake hits itself
for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
        playTryAgainSound(); // plays the death sound
        alert("Game Over!");
        snake = [{ x: 5, y: 5 }]; // Resets the snake
        direction = "RIGHT"; // Resets the snake and gives it a direction on restart
        return;
    }
}

// handles when the snake eats the food
    if (head.x === food.x && head.y === food.y) {
    playMunchSound(); // 🔊 play the munch sound
    // places a new food at random
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * rows)
    };
} else { // If no food is eaten, remove the last part of the snake, so it moves forward
    snake.pop();
}
    snake.unshift(head); // ads new head to the front of the snake

    // Draws the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);
}
function playTryAgainSound() { // function that plays when the snake dies
    const sound = new Audio("assets/audio/tryagain.mp3");
    sound.currentTime = 0;
    sound.play();
}

function playMunchSound() {// function that plays when the snake eats the food
    const munchSound = new Audio("assets/audio/munch.mp3");
    munchSound.play();
}

