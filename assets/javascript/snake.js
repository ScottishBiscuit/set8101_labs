// Get the canvas and drawing context
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Set up the game grid and box size
const box = 20;
const rows = Math.floor(canvas.width / box);

// Snake starting position
let snake = [{ x: 5, y: 5 }];
let direction = "RIGHT";

// Placing the first food
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * rows)
};

// Handles the keyboard input
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Draw the game every 100 miliseconds, can also slow and increase the speed
setInterval(drawGame, 100);

function drawGame() {
    // Clears the canvas
    ctx.fillStyle = "#fdf3e7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draws the snake
    ctx.fillStyle = "green";
    snake.forEach((part) => {
        ctx.fillRect(part.x * box, part.y * box, box, box);
    });

    // Moves the snake
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
    playTryAgainSound();
    alert("Game Over!");
    snake = [{ x: 5, y: 5 }];
    direction = "RIGHT";
    return;
}

// handles when the snake hits itself
for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
        playTryAgainSound();
        alert("Game Over!");
        snake = [{ x: 5, y: 5 }];
        direction = "RIGHT";
        return;
    }
}

    if (head.x === food.x && head.y === food.y) {
    playMunchSound(); // 🔊 play the munch sound
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * rows)
    };
} else {
    snake.pop();
}
    snake.unshift(head);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);
}
function playTryAgainSound() {
    const sound = new Audio("assets/audio/tryagain.mp3");
    sound.currentTime = 0;
    sound.play().catch(e => console.warn("Sound blocked:", e));
}

function playMunchSound() {
    const munchSound = new Audio("assets/audio/munch.mp3");
    console.log("🍎 Playing munch sound:", munchSound.src);
    munchSound.play().catch(e => console.warn("⚠️ Munch sound blocked by browser:", e));
}

