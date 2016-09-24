// Enemies our player must avoid
var Enemy = function(row = 1, name = 'Bug') {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.x = 0 - this.width;
    this.y = -23 + ((row - 1) * 83);
    this.speed = Math.floor(Math.random() * (10 - 1) + 1);
    this.name = name;
    this.row = row;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check if enemy hits the player, vertical we are checking if lanes are equal,
    // horizontaly we are checking for pixel-collision
    if ( this.x + this.width >= player.x + 18 && this.x <= player.x + 85 && this.row === player.row) {
        player.catched = true;
    }

    // Move the enemy
    this.x = this.x + (this.speed * 25 * dt);

    // If the enemy moves out of the canvas set the position to the start
    if (this.x > canvas.width) {
        this.x = 0 - this.width;
        this.speed = Math.floor(Math.random() * (10 - 1) + 1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// ** CODE BY DERRADO
var Player = function(row = 8, col = 4) {
    this.sprite = 'images/char-boy.png';
    this.row = row;
    this.col = col;

    this.xstep = 101;
    this.ystep = 83;

    this.score = 0;
    this.catched = false;
};


Player.prototype.update = function() {
    // Update player position
    this.x = this.xstep * (this.col - 1);
    this.y = this.ystep * (this.row - 1) - 10;

    // Check if player made it to the water, if so, we've won!
    if (this.y === -11) {
        this.score++;
        //this.y = 404;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    var maxRow = 8;
        maxCol = 8;


    if (pressedKey === "up") {
        if (this.row > 1) {
            this.row--;
        }
    } else if (pressedKey === "down") {
        if (this.row < canvas.height / 101) {
            this.row++;
        }
    } else if (pressedKey === "left") {
        if (this.col > 1) {
            this.col--;
        }
    } else if (pressedKey === "right") {
        if (this.col < canvas.width / 101) {
            this.col++;
        }
    };
};


// Now instantiate your objects.
var enemy1 = new Enemy(3, 'Sweety');
var enemy2 = new Enemy(4, 'Bugzilla');
var enemy3 = new Enemy(6, 'Donkey');
var enemy4 = new Enemy(7, 'Monkey');

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// Place the player object in a variable called player
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


document.addEventListener('click', function() {
    console.log(Engine);
});
