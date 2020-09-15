class Arcade extends Phaser.State {


    tileSize=96;

    pointsA = {
        'x': [0, 0.2, 0.3, 0.45, 0.5, 0.5],
        'y': [0.5, 0.5, 0.55, 0.65, 0.8, 1]
    }

    pointsB = {
        'y': [0, 0.2, 0.3, 0.45, 0.5, 0.5],
        'x': [0.5, 0.5, 0.55, 0.65, 0.8, 1]
    }

    preload() {


        game.load.image('mouse', 'assets/img/mouse.png');
        
        game.load.image('cheese', 'assets/img/queso.png');
        
        game.load.image('plate', 'assets/img/plate-empty.png');

        game.load.image('collider-h', 'assets/img/collider-hh.png');
        game.load.image('collider-vv', 'assets/img/collider-vv.png');

        game.load.spritesheet("tile", "assets/img/arcade.png", this.tileSize, this.tileSize);

    }

    create() {


        this.x = game.world.centerX - this.tileSize * 2;
        this.y = game.world.centerY - this.tileSize * 2;



        this.createBoard();

        this.createPlates();
        
        // Create Character
        // -----------------------------
        
        this.sprite = game.add.sprite(this.x+this.tileSize*3, this.y+this.tileSize*4, 'mouse');
        
        this.timer = game.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        this.timer.loop(150, this.move, this);
        // this.timer.start();

        // -----------------------------






        this.sprite = game.add.sprite(this.x, this.y-this.tileSize, 'cheese');









        // Create Collider-H
        // -----------------------------

        // this.createColliderH();

        // -----------------------------











    }

    createPlates(){

        this.group = game.add.group();
        
        this.group.createMultiple(4, 'plate', 1, true);

        this.group.align(4, -1, 96, 96);

        this.group.x = this.x;
        this.group.y = this.y-this.tileSize;

        // --------------------------------------------------
        this.groupDown = game.add.group();
        
        this.groupDown.createMultiple(4, 'plate', 1, true);

        this.groupDown.align(4, -1, 96, 96);

        this.groupDown.x = this.x;
        this.groupDown.y = this.y+(this.tileSize*4);
        
        
        // --------------------------------------------------
        
        this.groupLeft = game.add.group();
        
        this.groupLeft.createMultiple(4, 'plate', 1, true);

        this.groupLeft.align(1, -1, 96, 96);

        this.groupLeft.x = this.x-this.tileSize;
        this.groupLeft.y = this.y;
        
        
        
        
        // --------------------------------------------------
        
        
        this.groupLeft = game.add.group();
        
        this.groupLeft.createMultiple(4, 'plate', 1, true);

        this.groupLeft.align(1, -1, 96, 96);

        this.groupLeft.x = (this.x-this.tileSize)+(this.tileSize*5);
        this.groupLeft.y = this.y;
        
        
    }

    createColliderH() {

        this.i = 0;

        // game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(this.sprite1);
        // this.sprite.inputEnabled = true;
        // this.sprite.input.enableDrag();
        // this.sprite.visible=false;
        // game.stage.backgroundColor = "#4488AA";
        // console.log('Hola Mundo !!!');
        this.group = game.add.group();
        // this.group = game.add.physicsGroup();
        //  Creates 24 sprites FOR EACH FRAME
        // this.group.createMultiple(20, 'tile', 1, true);
        this.group.createMultiple(20, 'collider-h', 1, true);

        // sprites.createMultiple(20, ['diamonds', 'balls'], [0, 1, 2], true);
        //  Align the sprites into rows of 12, by however many we need (the -1 argument)
        //  With 48x48 pixel spacing per sprite
        this.group.align(4, -1, 96, 96);

        this.group.x = 100;
        this.group.y = 64;
    }

    createBoard() {


        var x = this.x;
        var y = this.y;


        this.piezas = new Tiles();

        this.piezas.setX(this.x);
        this.piezas.setY(this.y);


        this.group = game.add.group();        
        
        
        for (var id = 1; id < 15; id++) {
            
            
            let pieza = game.add.sprite(x, y, 'tile', id-1);
            pieza.inputEnabled = true;
            pieza.input.enableDrag();
            this.piezas[id-1] = pieza;
            pieza.fila = ~~(id / 4);
            pieza.columna = id % 4;
            this.group.add(pieza);
            pieza.id = id-1;
            
            pieza.input.useHandCursor = true;
            
            
            // pieza.events.onDragStart.add(this.onDragStart, this);
            // pieza.events.onInputOver.add(this.markerOver, this);
            // pieza.events.onDragStop.add(this.onDragStop, this);
            // pieza.events.onInputOut.add(this.markerOut, this);
            
            x += this.tileSize;
            if (!(id % 4)) { y += this.tileSize; x = this.x; }
            
            
        }

        this.piezaBlk = game.add.sprite(x, y, 'tile', 15);
        this.group.add(this.piezaBlk);
        this.piezas[15] = this.piezaBlk;
        // this.piezaBlk.columna = 3;
        // this.piezaBlk.fila = 3;
        this.piezaBlk.id = 15;

    }
    
    move() {

        // console.log("Hola Mndo !!!");
        // console.log(this.sprite.position.x);
        // console.log(this.sprite.position.y);
        // console.log(this.sprite.width);
        // console.log(this.pointsA.x);
        // console.log(this.pointsA.y);


        this.sprite.position.x = 64 + this.sprite.width * this.pointsA.x[this.i];
        this.sprite.position.y = 64 + this.sprite.width * this.pointsA.y[this.i];
        // this.sprite.visible=true;

        this.i++;
        if (this.i == this.pointsA.x.length) {

            this.i = 0;
            // this.sprite.visible=false;
            this.sprite.position.x = 64;
            this.sprite.position.y = 96;
        }

        // console.log(this.i);
        // console.log(this.sprite.position.x);
        // console.log(this.sprite.position.y);


    }

    update() {


    }


    render() {

        // game.debug.body(this.group);
        // game.debug.physicsGroup(this.group);

    }

}

var arcade = new Arcade();








// var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');
// 
// var PhaserGame = function () {
// 
    // this.bmd = null;
// 
    // this.alien = null;
// 
    // this.mode = 0;
// 
    // this.points = {
        // 'x': [ 32, 128, 256, 384, 512, 608 ],
        // 'y': [ 240, 240, 240, 240, 240, 240 ]
    // };
// 
    // this.pi = 0;
    // this.path = [];
// 
// };
// 
// PhaserGame.prototype = {
// 
    // init: function () {
// 
        // this.game.renderer.renderSession.roundPixels = true;
        // this.stage.backgroundColor = '#204090';
// 
    // },
// 
    // preload: function () {
// 
        //  We need this because the assets are on Amazon S3
        //  Remove the next 2 lines if running locally
        // this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue008/';
        // this.load.crossOrigin = 'anonymous';
// 
        // this.load.image('alien', 'assets/ufo.png');
        // this.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');
// 
        //  Note: Graphics are not for use in any commercial project
// 
    // },
// 
    // create: function () {
// 
        // this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        // this.bmd.addToWorld();
// 
        // this.alien = this.add.sprite(0, 0, 'alien');
        // this.alien.anchor.set(0.5);
// 
        // var py = this.points.y;
// 
        // for (var i = 0; i < py.length; i++)
        // {
            // py[i] = this.rnd.between(32, 432);
        // }
// 
        // this.hint = this.add.bitmapText(8, 444, 'shmupfont', "Linear", 24);
// 
        // this.input.onDown.add(this.changeMode, this);
// 
        // this.plot();
// 
    // },
// 
    // changeMode: function () {
// 
        // this.mode++;
// 
        // if (this.mode === 3)
        // {
            // this.mode = 0;
        // }
// 
        // if (this.mode === 0)
        // {
            // this.hint.text = "Linear";
        // }
        // else if (this.mode === 1)
        // {
            // this.hint.text = "Bezier";
        // }
        // else if (this.mode === 2)
        // {
            // this.hint.text = "Catmull Rom";
        // }
// 
        // this.plot();
// 
    // },
// 
    // plot: function () {
// 
        // this.bmd.clear();
// 
        // this.path = [];
// 
        // var x = 1 / game.width;
// 
        // for (var i = 0; i <= 1; i += x)
        // {
            // if (this.mode === 0)
            // {
                // var px = this.math.linearInterpolation(this.points.x, i);
                // var py = this.math.linearInterpolation(this.points.y, i);
            // }
            // else if (this.mode === 1)
            // {
                // var px = this.math.bezierInterpolation(this.points.x, i);
                // var py = this.math.bezierInterpolation(this.points.y, i);
            // }
            // else if (this.mode === 2)
            // {
                // var px = this.math.catmullRomInterpolation(this.points.x, i);
                // var py = this.math.catmullRomInterpolation(this.points.y, i);
            // }
// 
            // this.path.push( { x: px, y: py });
// 
            // this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
        // }
// 
        // for (var p = 0; p < this.points.x.length; p++)
        // {
            // this.bmd.rect(this.points.x[p]-3, this.points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
        // }
// 
    // },
// 
    // update: function () {
// 
        // this.alien.x = this.path[this.pi].x;
        // this.alien.y = this.path[this.pi].y;
// 
        // this.pi++;
// 
        // if (this.pi >= this.path.length)
        // {
            // this.pi = 0;
        // }
// 
    // }
// 
// };
// 
// game.state.add('Game', PhaserGame, true);
// 