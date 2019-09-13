// Set starting level 1
var level = 1;

// Enemy class
var Enemy = function() {
  //set enemy avatar
  this.sprite = "images/enemy-bug.png";

  this.x = Math.floor(Math.random() * 504 );
  // Array of posible enemies y position
  this.yArray = [41.5, 124.5, 207.5];
  // Set enemy position to random yArray value
  this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];

  // Set enemy speed to a random value between 70 and 160 and multiply by the level to increase difficulty
  this.speed = Math.floor(Math.random() * 10 + 70) * level;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  // Multiply by the dt parameter to ensure the game runs at the same speed for all computers

  // restart enemy position when it reaches the canvas border
  if (this.x > 504) {
    // Set enemy x start position
    this.x = -90;

    // Set enemy position to random yArray value
    this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];

    // Set enemy speed to a random value between 70 and 160 and multiply by the level to increase difficulty
    this.speed = Math.floor(Math.random() * 10 + 70) * level;
  }

  // Check if enemy hit player
  // A hit occurs when the enemy position is at the same time between the player x and y position.
  // It is necessary to add a value to player.x and player.y in order to check for a hit on the boundaries of the player image
  if (
    this.x > player.x - 75 &&
    this.x < player.x + 75 &&
    (this.y > player.y - 75 && this.y < player.y + 75)
  ) {
    // Return player to initial position
    player.x = 202.5;
    player.y = 370;

    // Enemies go to random positions
    allEnemies.forEach(function(enemy) {
      enemy.x = Math.floor(Math.random() * 504 + -90);
      enemy.y = enemy.yArray[Math.floor(Math.random() * enemy.yArray.length)];
    });

    // Return to level 1
    level = 1;
  }

  // Display the level variable value to .level span when update
  document.querySelector("#level").innerHTML = level;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// Player class
var Player = function() {
  // Set initial player position
  this.x = 202.5;
  this.y = 370;

  // Set player image
  this.sprite = "images/char-boy.png";
};


Player.prototype.handleInput = function(keyPress) {
  // Change position according to input keyPress
  // if statments only allows movement inside canvas bounderies
  switch (keyPress) {
    case "up":
      this.y = this.y - 83;
      if (this.y < 0) {
        this.x = 202.5;
        this.y = 370;
        level++;
      }
      break;
    case "down":
      if (this.y < 370) {
        this.y = this.y + 83;
      }
      break;
    case "left":
      if (this.x > 0) {
        this.x = this.x - 101;
      }
      break;
    case "right":
      if (this.x < 404) {
        this.x = this.x + 101;
      }
      break;
  }
};

Player.prototype.update = function(dt) {};

// Render player on the screen method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instatiate enemies in allEnemie array
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Instantiate player
var player = new Player();

// Listen for key presses and send keys to Player.handleInput() method
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
