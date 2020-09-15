var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

game.state.add('menu', menu);
game.state.add('play', play);
game.state.add('traberinto815', traberinto815);
game.state.add('arcade', arcade);

// game.state.start('play');
// game.state.start('arcade');
game.state.start('menu');
// game.state.start('traberinto815');



// 