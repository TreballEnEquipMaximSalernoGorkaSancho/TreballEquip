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

        // Sprites del cotxe de la policia
        this.load.image('policiaL', '../assets/sprites/policiaLeft.png');
        this.load.image('policiaR', '../assets/sprites/policiaRight.png');
        this.load.image('policiaU', '../assets/sprites/policiaUp.png');
        this.load.image('policiaD', '../assets/sprites/policiaDown.png');

    }


    create(){

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ciutat', 'tiles');
        //Es diu capa de patrones 1 perque aixi es diu al JSON, si es canvia peta
        const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);

        // Afegim les posicions d'aparició del jugador
        const spawns = [
            {x: 0, y: 0, xP: 480, yP: 480},
            {x: 0, y: 480, xP: 480, yP: 0},
            {x: 480, y: 0, xP: 0, yP: 480},
            {x: 480, y: 480, xP: 0, yP: 0}
        ];

        const randomSpawn = Phaser.Math.RND.pick(spawns); // Seleccionem un punt d'aparició aleatori entre els quatre
      

        /*
        this.add.image(400, 300, 'cotxeR');
        this.add.image(250, 250, 'cotxeL');
        this.add.image(100, 100, 'cotxeU');
        this.add.image(150, 150, 'cotxeD');
        */

        this.add.image(randomSpawn.xP, randomSpawn.yP, 'policiaD');
       
        this.player = new Player(this, randomSpawn.x, randomSpawn.y, {
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
