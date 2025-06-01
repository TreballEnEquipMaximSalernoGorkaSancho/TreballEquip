import Player from "./player.js";

export default class nivell extends Phaser.Scene {
    constructor(){
        super('nivell');
    }

    preload(){
        this.load.image('tiles', '../mapa/tilemap.png');
        this.load.tilemapTiledJSON('map', '../mapa/prova2.json');
        this.load.image('cotxeR', '../mapa/cotxeR.png');
    }


    create(){
        this.player = new Player(this, 400, 300, 'player');

        this.controls = this.input.keyboard.addKeys({
            adalt: Phaser.Input.Keyboard.KeyCodes.W,
            abaix: Phaser.Input.Keyboard.KeyCodes.S,
            esquerra: Phaser.Input.Keyboard.KeyCodes.A,
            dreta: Phaser.Input.Keyboard.KeyCodes.D
        });

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ciutat', 'tiles');
        const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);
        this.add.image(400, 300, 'cotxeR');

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    //Aixo sera el bucle de joc!!
    update() {
        this.player.move(this.controls);
        //Fer logica enemic??
        //Verificar col·lisions??
    }
};
