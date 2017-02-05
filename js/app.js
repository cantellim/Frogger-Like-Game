// Enemies our player must avoid
var Enemy = function(y, speed) {
    this.x = -150;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.length = 75;
};
// Update the enemy's position
// Parameter: dt, a time delta between ticks to ensure the game runs at the same speed for all computers
Enemy.prototype.update = function(dt, player) {
    this.checkCollision(player);
    this.x += this.speed * dt;
    if (this.x > 550) {
        this.x = -150;
        this.speed = Math.random() * (400 - 100) + 100;
    }
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//This function will look for collisions and reset the player
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        player.reset();
    }
};
// Create each enemy with different y parameters
var enemy1 = new Enemy(65, Math.random() * (400 - 100) + 100);
var enemy2 = new Enemy(150, Math.random() * (400 - 100) + 100);
var enemy3 = new Enemy(230, Math.random() * (400 - 100) + 100);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Now instantiate your objects.
// Place the player object in a variable called player
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-horn-girl.png';
    var obj = Object.create(Player.prototype);
};
// Draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Keeping the player on the board
Player.prototype.handleInput = function(direction) {
        if (direction === 'up') {
            this.y = this.y - 80;
        }
        if (direction === 'down') {
            this.y = this.y + 80;
        }
        if (direction === 'right') {
            this.x = this.x + 100;
        }
        if (direction === 'left') {
            this.x = this.x - 100;
        }
        if (this.x < 0) {
            this.x = 0;
        } 
        else if (this.x > 400) {
            this.x = 400;

        }
        if (this.y < 0) {
            this.reset();

        }
        else if (this.y > 400) {
            this.y = 400;

    }

}
// Constructor function to create the player object and return it
var player = new Player();
// Tells the player where to start on the canvas when the game starts over
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
Player.prototype.update = function() {
    if (this.y === -35) {
        this.reset();
    }
};
// Add directional movement for the player with key functions
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
