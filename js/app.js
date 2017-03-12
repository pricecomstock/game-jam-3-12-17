var game = new Phaser.Game(800,600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
},
false, false);

var player;
var cursors;

function preload() {
    game.load.spritesheet('dragon', 'assets/dragon.png', 32, 32);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(0, 100, 'dragon');
    player.scale.setTo(7,7);
    player.enableBody = true;
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    player.body.velocity.y = 0;

    if (cursors.up.isDown) {
        player.body.velocity.y = -100;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 100;
    } else {
        player.animations.stop();
    }
}