class Menu extends Phaser.State {

    preload() {

        game.load.image('deslizar', 'assets/img/deslizar.png');
        game.load.image('traberinto', 'assets/img/traberinto.png');
        game.load.image('tomar', 'assets/img/tomar.png');



    }

    create() {

        this.bDeslizar = game.add.button(0, 0, 'deslizar', this.deslizarOnClick, this);
        // this.bSuffle = game.add.button(0, 0, 'button', this.comenzarOnClick, this, 2, 1, 0);
        var x = game.world.centerX - (this.bDeslizar.width / 2);
        var y = game.world.height - 6*(this.bDeslizar.height);


        this.bDeslizar.position.x = x;
        this.bDeslizar.position.y = y;


        this.bTraberinto = game.add.button(0, 0, 'traberinto', this.traberintoOnClick, this);
        // this.bSuffle = game.add.button(0, 0, 'button', this.comenzarOnClick, this, 2, 1, 0);
        var x = game.world.centerX - (this.bTraberinto.width / 2);
        var y = game.world.height - 4*(this.bTraberinto.height);


        this.bTraberinto.position.x = x;
        this.bTraberinto.position.y = y;


        this.bTomar = game.add.button(0, 0, 'tomar', this.tomarOnClick, this);
        // this.bSuffle = game.add.button(0, 0, 'button', this.comenzarOnClick, this, 2, 1, 0);
        var x = game.world.centerX - (this.bTomar.width / 2);
        var y = game.world.height - 2*(this.bTomar.height);


        this.bTomar.position.x = x;
        this.bTomar.position.y = y;

    }

    deslizarOnClick(){

        game.state.start('traberinto815');

    }

    tomarOnClick(){

        game.state.start('play');



    }

    traberintoOnClick(){

        game.state.start('arcade');


    }

}

var menu = new Menu();