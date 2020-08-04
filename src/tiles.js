class Tile {
    // class Tile extends Phaser.Sprite {

    id = 0;
    fila = 0;
    x = 0; y = 0;
    sprite = 0;
    columna = 0;


    constructor(id, sprite) {
        // constructor(id) {


        this.id = id;
        this.sprite = sprite;

        this.fila = ~~(id / 3);
        this.columna = id % 3;

        this.y = sprite.y;
        this.x = sprite.x;

    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setFila(fila) {
        this.fila = fila;
    }

    getFila() {
        return this.fila;
    }


    setColumna(columna) {
        this.columna = columna;
    }
    getColumna() {
        return this.columna;
    }

    // setX(x) {
    //     this.x = x;
    // }
    // getX() {
    //     return this.x;
    // }

    // setY(y) {
    //     this.y = y;
    // }
    // getY() {
    //     return this.y;
    // }

    // setSprite(sprite) {
    //     this.sprite = sprite;
    // }
    // getSprite() {
    //     return this.sprite;
    // }


}

class Tiles extends Array {

    x = 0;
    y = 0;



    constructor() {

        super();

    }

    suffle() {

        
        this.swap();
        this.reorder();

    }

    swap() {

        this.sort((function (a, b) {
            return 0.5 - Math.random()
        }));


    }

    reorder() {



        for (var id = 0; id < this.length; id++) {


            this[id].position.x = this.x + (~~(id / 3) * this[id].width);
            this[id].position.y = this.y + ((id % 3) * this[id].width);

        }


    }

    setX(x) {

        this.x = x;


    }

    setY(y) {

        this.y = y;

    }




}





