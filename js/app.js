var game = new Phaser.Game(800,600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
},
false, false);

var C = {
    movespeed: 200
};


var player;
var cursors;

function preload() {
    game.load.spritesheet('dragon', 'assets/dragon.png', 32, 32, 6);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(0, 100, 'dragon');
    player.scale.setTo(5,5);

    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    console.log(player)

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    player.body.velocity.y = 0;

    if (cursors.up.isDown) {
        player.body.velocity.y = -C.movespeed;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = C.movespeed;
    } else {
        player.animations.stop();
    }
}