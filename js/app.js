var game = new Phaser.Game(800,600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('dragon', 'assets/dragon.png')
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 200, 'dragon');
}

function update() {
    
}