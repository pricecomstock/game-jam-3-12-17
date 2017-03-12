// Define some constants
var C = {
    width: 800,
    height: 600,
    movespeed: 250,
    birdspawn: {
        minInterval: 500,
        maxInterval: 1000
    }
};


var game = new Phaser.Game(C.width, C.height, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
},
false, false);



var player;
var birds;

var cursors;
var spaceKey;

var birdTime = 0;

function preload() {
    game.load.spritesheet('dragon', 'assets/dragon.png', 32, 32, 7);
    game.load.spritesheet('bird', 'assets/bird.png', 16, 16, 4);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //import dragon spritesheet
    player = game.add.sprite(0, 100, 'dragon');
    player.scale.setTo(5,5);

    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('idle', [0,6], 6, true);
    player.animations.add('up', [2,3], 6, true);
    player.animations.add('down', [5,4], 6, true);
    player.animations.add('chomp', [1,0], 6, true);
    player.animations.add('chompup', [1,2,3], 6, true);
    player.animations.add('chompdown', [1,5,4], 6, true);

    //import bird spritesheet
    birds = game.add.group();
    birds.enableBody = true;
    game.physics.arcade.enable(birds);

    console.log(player)
    console.log(birds)

    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    player.body.velocity.y = 0;
    let chomping = false;
    let movement = false;
    
    if (game.time.now >= birdTime) {
        randomBird();
    }

    // Chomping
    if (spaceKey.isDown) {
        chomping = true;
    }

    // Movement
    if (cursors.up.isDown) {
        player.body.velocity.y = -C.movespeed;
        movement = true;
        if (!chomping) {
            player.animations.play('up');
        } else {
            player.animations.play('chompup');
        }
    }
    if (cursors.down.isDown) {
        player.body.velocity.y = C.movespeed;
        movement = true;
        if (!chomping) {
            player.animations.play('down');
        } else {
            player.animations.play('chompdown');
        }
    }

    if (chomping && !movement) {
        player.animations.play('chomp');
    } else if (!chomping && !movement) {
        player.animations.play('idle');
    }

}

function randomBird() {
    var bird = birds.create(C.width, Math.random()*(C.height-100) + 50, 'bird');
    bird.body.velocity.x = Math.random()*(-50)-70;
    bird.scale.set(5, 5);

    bird.animations.add('fly', [1,3,2,0], 12, true);
    bird.animations.play('fly')

    birdTime = game.time.now + Math.random() * (C.birdspawn.maxInterval - C.birdspawn.minInterval) + C.birdspawn.minInterval
}