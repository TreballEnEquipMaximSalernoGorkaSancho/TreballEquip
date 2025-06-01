import Player from "./player.js";

export default class nivell extends Phaser.Scene {
    constructor(){
        super('nivell');
    }

    preload(){
        this.load.image('tiles', '../mapa/tilemap.png');
        this.load.tilemapTiledJSON('map', '../mapa/prova2.json');

        //Left i Right estan del reves pq ens vam equivocar, mes endavant canviar noms si ens recordem
        this.load.image('cotxeR', '../assets/sprites/cotxeRight.png');
        this.load.image('cotxeL', '../assets/sprites/cotxeLeft.png');
        this.load.image('cotxeU', '../assets/sprites/cotxeUp.png');
        this.load.image('cotxeD', '../assets/sprites/cotxeDown.png');

    }


    create(){

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ciutat', 'tiles');
        const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);
        /*
        this.add.image(400, 300, 'cotxeR');
        this.add.image(250, 250, 'cotxeL');
        this.add.image(100, 100, 'cotxeU');
        this.add.image(150, 150, 'cotxeD');
        */
        this.player = new Player(this, 400, 300, {
            adalt: 'cotxeU',
            abaix: 'cotxeD',
            dreta: 'cotxeR',
            esquerra: 'cotxeL'
        });
        this.controls = this.input.keyboard.addKeys({
            adalt: Phaser.Input.Keyboard.KeyCodes.W,
            abaix: Phaser.Input.Keyboard.KeyCodes.S,
            esquerra: Phaser.Input.Keyboard.KeyCodes.A,
            dreta: Phaser.Input.Keyboard.KeyCodes.D
        });



        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    //Aixo sera el bucle de joc!!
    update() {
        this.player.move(this.controls);
        //Fer logica enemic??
        //Verificar col·lisions??
    }
};
