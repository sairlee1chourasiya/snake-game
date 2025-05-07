const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, 
             y: Math.floor(Math.random() * (canvas.height / box)) * box };
let direction = "RIGHT";

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box));

    let newHead = { x: snake[0].x, y: snake[0].y };

    if (direction === "UP") newHead.y -= box;
    if (direction === "DOWN") newHead.y += box;
    if (direction === "LEFT") newHead.x -= box;
    if (direction === "RIGHT") newHead.x += box;

    if (newHead.x === food.x && newHead.y === food.y) {
        food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
        food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
    } else {
        snake.pop();
    }

    if (
        newHead.x < 0 || newHead.x >= canvas.width ||
        newHead.y < 0 || newHead.y >= canvas.height ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        clearInterval(game);
        alert("Game Over!");
    }

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
