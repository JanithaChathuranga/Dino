// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dinoWidth = 50;
const dinoHeight = 50;
const groundHeight = 50;
const gravity = 1.5;
const jumpStrength = -20;

let dinoX = 50;

let dinoY = canvas.height - groundHeight - dinoHeight;
let velocityY = 0;
let isJumping = false;
let isGameOver = false;

let cacti = [];
let gameSpeed = 3;
let score = 0;

function drawDino() {
    ctx.fillStyle = "#28a745";  // Dino Color
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
}

function drawGround() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function spawnCactus() {
    if (Math.random() < 0.02) {  // Random chance to spawn cactus
        let cactusHeight = Math.random() * (canvas.height - groundHeight - 50) + 30;
        cacti.push({
            x: canvas.width,
            y: canvas.height - groundHeight - cactusHeight,
            width: 20 + Math.random() * 30,
            height: cactusHeight
        });
    }
}

function drawCacti() {
    ctx.fillStyle = "#d9534f";  // Cactus Color
    for (let i = 0; i < cacti.length; i++) {
        ctx.fillRect(cacti[i].x, cacti[i].y, cacti[i].width, cacti[i].height);
        cacti[i].x -= gameSpeed;

        // Remove cactus when off screen
        if (cacti[i].x + cacti[i].width < 0) {
            cacti.splice(i, 1);
            score++;
        }
    }
}

function detectCollision() {
    for (let i = 0; i < cacti.length; i++) {
   if (dinoX + dinoWidth > cacti[i].x && dinoX < cacti[i].x + cacti[i].width) {
            if (dinoY + dinoHeight > cacti[i].y) {
                isGameOver = true;
                document.getElementById("gameOver").style.display = "block";
            }
        }
    }
}

function updateGame() {
    if (isGameOver) return;

    // Update Dino's position
    if (isJumping) {
        velocityY += gravity;
        dinoY += velocityY;

        if (dinoY >= canvas.height - groundHeight - dinoHeight) {
            dinoY = canvas.height - groundHeight - dinoHeight;
            isJumping = false;
            velocityY = 0;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game components
    drawGround();
    drawDino();
    drawCacti();
    spawnCactus();
    detectCollision();

    // Display score
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);

    // Game loop
    requestAnimationFrame(updateGame);
}

// Start game when spacebar is pressed
document.addEventListener("keydown", function (event) {
    if (event.key === " " && !isJumping && !isGameOver) {
        isJumping = true;
        velocityY = jumpStrength;
    }
   if (event.key === "r" && isGameOver) {
        // Restart the game
        isGameOver = false;
        score = 0;
        cacti = [];
        document.getElementById("gameOver").style.display = "none";
        updateGame();
    }
});

// Start the game loop
updateGame();

// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dinoWidth = 50;
const dinoHeight = 50;
const groundHeight = 50;
const gravity = 1.5;
const jumpStrength = -20;

let dinoX = 50;
let dinoY = canvas.height - groundHeight - dinoHeight;
let velocityY = 0;
let isJumping = false;
let isGameOver = false;

let cacti = [];
let gameSpeed = 3;
let score = 0;

const dinoSpeed = 5;  // Speed of Dino's movement

// Draw the Dinosaur
function drawDino() {
    ctx.fillStyle = "#28a745";  // Dino Color
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
}

// Draw the ground
function drawGround() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

// Generate Cacti
function spawnCactus() {
    if (Math.random() < 0.02) {  // Random chance to spawn cactus
        let cactusHeight = Math.random() * (canvas.height - groundHeight - 50) + 30;
        cacti.push({
            x: canvas.width,
            y: canvas.height - groundHeight - cactusHeight,
            width: 20 + Math.random() * 30,
            height: cactusHeight
        });
    }
}

// Draw Cacti
function drawCacti() {
    ctx.fillStyle = "#d9534f";  // Cactus Color
    for (let i = 0; i < cacti.length; i++) {
        ctx.fillRect(cacti[i].x, cacti[i].y, cacti[i].width, cacti[i].height);
        cacti[i].x -= gameSpeed;

        // Remove cactus when off-screen
        if (cacti[i].x + cacti[i].width < 0) {
            cacti.splice(i, 1);
            score++;
        }
    }
}

// Detect collisions between the dinosaur and cacti
function detectCollision() {
    for (let i = 0; i < cacti.length; i++) {
        if (dinoX + dinoWidth > cacti[i].x && dinoX < cacti[i].x + cacti[i].width) {
            if (dinoY + dinoHeight > cacti[i].y) {
                isGameOver = true;
                document.getElementById("gameOver").style.display = "block";
            }
        }
    }
}

// Update the game state
function updateGame() {
    if (isGameOver) return;

    // Update Dino's position based on jumping and gravity
    if (isJumping) {
        velocityY += gravity;
        dinoY += velocityY;

        // Stop the dino when it hits the ground
        if (dinoY >= canvas.height - groundHeight - dinoHeight) {
            dinoY = canvas.height - groundHeight - dinoHeight;
            isJumping = false;
            velocityY = 0;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game components
    drawGround();
    drawDino();
    drawCacti();
    spawnCactus();
    detectCollision();

    // Display score
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);

    // Game loop
    requestAnimationFrame(updateGame);
}

// Handle keyboard inputs
document.addEventListener("keydown", function (event) {
    if (event.key === " " && !isJumping && !isGameOver) {
        // Spacebar: Make Dino jump
        isJumping = true;
        velocityY = jumpStrength;
    }
    
    if (event.key === "r" && isGameOver) {
        // R key: Restart the game
        isGameOver = false;
        score = 0;
        cacti = [];
        document.getElementById("gameOver").style.display = "none";
        updateGame();
    }

    // Left Arrow key to move Dino left
    if (event.key === "ArrowLeft" && dinoX > 0) {
        dinoX -= dinoSpeed;
    }

    // Right Arrow key to move Dino right
    if (event.key === "ArrowRight" && dinoX + dinoWidth < canvas.width) {
        dinoX += dinoSpeed;
    }
});

// Start the game loop
updateGame();
