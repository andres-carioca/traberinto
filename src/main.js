var game =new Phaser.Game(800,600,Phaser.CANVAS, '');

game.state.add('play',play);

game.state.start('play');


