var game = new Phaser.Game(800,600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
},
false, false);

var C = {
    movespeed: 250
};


var player;

var cursors;
var spaceKey;

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

    player.animations.add('up', [2,3], 6, true);
    player.animations.add('down', [5,4], 6, true);
    player.animations.add('chomp', [1,0], 6, true);

    console.log(player)

    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    player.body.velocity.y = 0;
    let chomping = false;
    let movement = false;
    
    // Chomping
    if (spaceKey.isDown) {
        player.animations.play('chomp');
        chomping = true;
    }
    // Movement
    if (cursors.up.isDown) {
        player.body.velocity.y = -C.movespeed;
        movement = true;
        if (!chomping) {
            player.animations.play('up');
        }
    }
    if (cursors.down.isDown) {
        player.body.velocity.y = C.movespeed;
        movement = true;
        if (!chomping) {
            player.animations.play('down');
        }
    }
    if (!chomping && !movement) {
        player.animations.stop();
        player.frame = 0;
    }

}