class Traberinto815 extends Phaser.State {


    tileSize = 128;
    widthBoard = 3;
    piezaBlk;
    piezas;
    marker;
    group;


    preload() {


        game.load.image('comenzar', 'assets/img/comenzar.png');

        // game.load.spritesheet("tile", "assets/img/letra-a.png", 396, 396);
        game.load.spritesheet("tile", "assets/img/letra-a.png", this.tileSize, this.tileSize);

    }

    create() {


        // game.physics.startSystem(Phaser.Physics.ARCADE);


        // let widthImage= game.cache.getImage('tile').width;
        // this.tileSize=widthImage/3;
        // console.log(this.tileSize);



        game.stage.backgroundColor = "#4488AA";


        // position board
        //-------------------

        this.x = game.world.centerX - this.tileSize * 1.5;
        this.y = game.world.centerY - this.tileSize * 1.5;


        var graphics = game.add.graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(this.x, this.y, this.tileSize * 3, this.tileSize * 3);
        graphics.endFill();
        //-------------------




        //-------------------


        var x = this.x;
        var y = this.y;


        this.piezas = new Tiles();

        this.piezas.setX(this.x);
        this.piezas.setY(this.y);


        this.group = game.add.group();


        this.piezaBlk = game.add.sprite(x, y, 'tile', 0);
        this.group.add(this.piezaBlk);
        this.piezas[0] = this.piezaBlk;
        this.piezaBlk.columna = 0;
        this.piezaBlk.fila = 0;
        this.piezaBlk.pos = 0;
        this.piezaBlk.id = 0;



        for (var id = 1; id < 9; id++) {

            x += this.tileSize;
            if (!(id % 3)) { y += this.tileSize; x = this.x; }


            let pieza = game.add.sprite(x, y, 'tile', id);
            // pieza.inputEnabled = true;
            // pieza.input.enableDrag();
            this.piezas[id] = pieza;
            pieza.fila = ~~(id / 3);
            pieza.columna = id % 3;
            this.group.add(pieza);
            pieza.pos = id;
            pieza.id = id;

            // pieza.input.useHandCursor = true;

            // console.log('pieza:pos:',pieza.pos);


            // pieza.events.onDragStart.add(this.onDragStart, this);
            pieza.events.onInputOver.add(this.markerOver, this);
            // pieza.events.onDragStop.add(this.onDragStop, this);
            pieza.events.onInputOut.add(this.markerOut, this);
            pieza.events.onInputDown.add(this.clickPiece, this);



        }

        // console.log(this.piezas);


        //-------------------


        let mark = game.add.graphics(0, 0);
        mark.lineStyle(2, 0xff0000, 1);
        mark.drawRect(0, 0, this.tileSize, this.tileSize);
        this.marker = game.add.sprite(0, 0, mark.generateTexture());
        this.marker.visible = false;
        mark.destroy();


        //-------------------


        //-------------------


        // habilitar input piezas


        // this.enablePiezas();










        //-------------------











        //-------------------




        this.bSuffle = game.add.button(0, 0, 'comenzar', this.comenzarOnClick, this);
        // this.bSuffle = game.add.button(0, 0, 'button', this.comenzarOnClick, this, 2, 1, 0);
        var x = game.world.centerX - (this.bSuffle.width / 2);
        var y = game.world.height - (this.bSuffle.height);


        this.bSuffle.position.x = x;
        this.bSuffle.position.y = y;


        // button.onInputOver.add(this.over, this);
        // button.onInputOut.add(this.out, this);
        // button.onInputUp.add(this.up, this);





        //-------------------




    }

    enablePiezas() {

        this.resetInputs();

        let pos = this.piezaBlk.pos;


        console.log('pos:', this.piezaBlk.pos);

        // console.log('pos+1:',pos+1);
        // console.log('pos-1:',pos-1);
        // console.log('pos+ancho:',pos + this.widthBoard);
        // console.log('pos-anco:',pos - this.widthBoard);


        if (pos + this.widthBoard < this.piezas.length)
            this.piezas[pos + this.widthBoard].inputEnabled = true;


        if ((pos + 1) % this.widthBoard != 0)
            this.piezas[pos + 1].inputEnabled = true;

        if (pos - this.widthBoard >= 0)
            this.piezas[pos - this.widthBoard].inputEnabled = true;

        
        if (pos % this.widthBoard != 0)
            this.piezas[pos - 1].inputEnabled = true;

    }


    resetInputs() {

        for (let i = 0; i < this.piezas.length; i++) {
            this.piezas[i].inputEnabled = false;

        }
    }

    update() {

    }

    markerOver(pieza) {

        this.marker.visible = true;

        this.marker.position.x = pieza.position.x;
        this.marker.position.y = pieza.position.y;


    }

    markerOut() {

        this.marker.visible = false;


    }

    onDragStart(pieza) {

        pieza.scale.setTo(1.1);

        this.marker.visible = false;

        this.group.bringToTop(pieza);

        this.dragPoint = pieza.input.dragStartPoint;




    }

    onDragStop(pieza) {

        pieza.scale.setTo(1);


        if (Phaser.Rectangle.intersects(pieza, this.piezaBlk)) {

            this.piezaBlk.position.x = pieza.input.dragStartPoint.x;
            this.piezaBlk.position.y = pieza.input.dragStartPoint.y;

            pieza.position.x = this.piezaBlk.position.x;
            pieza.position.y = this.piezaBlk.position.y;


            // let id=pieza.id;
            // this.piezaBlk


        } else {

            pieza.position.x = pieza.input.dragStartPoint.x;
            pieza.position.y = pieza.input.dragStartPoint.y;


        }

    }

    clickPiece(piece){

        console.log(piece);

        this.resetInputs();

        let posBLK = this.piezaBlk.pos;
        let posPiece = piece.pos;

        let x=piece.position.x;
        let y=piece.position.y;

        // game.add.tween(piece).to({x: this.piezaBlk.posX * this.tileSize, y: this.piezaBlk.posY * this.tileSize}, 300, Phaser.Easing.Linear.None, true);
        let animation=game.add.tween(piece).to({x: this.piezaBlk.position.x, y: this.piezaBlk.position.y}, 300, Phaser.Easing.Linear.None, true);

        
        this.piezas[posBLK]=piece;
        this.piezas[posPiece]=this.piezaBlk;

        piece.pos=posBLK;
        this.piezaBlk.pos=posPiece;
        
        this.piezaBlk.position.x=x;
        this.piezaBlk.position.y=y;


        animation.onComplete.add(this.enablePiezas,this);

        


    }


    comenzarOnClick() {

        this.resetInputs();

        this.piezas.suffle();

        this.enablePiezas();


        // console.log(this.piezaBlk);
        // console.log(this.piezas);

    }



}

var traberinto815 = new Traberinto815();