import Player from "./player.js";
import Policia from "./policia.js";
import { rankings } from "./logicaRanking.js";
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

        //Sprite meta. Cambiar mes tard
        this.load.image('meta','../assets/sprites/Meta.png');
    }


    create(){

        // Agafem les opcions entrades des de "options.html" i guardades a localStorage
         this.opcions = JSON.parse(localStorage.opcions || JSON.stringify({}));

        // Fem un switch per comprovar la dificultat escollida pel jugador
        switch(this.opcions.dificultat) {
            case "easy":
                this.opcions.temps = 60;
                this.opcions.nPolicies = 1;
                this.multiplicador = 0.5;
                break;

            case "hard":
                this.opcions.temps = 20;
                this.opcions.nPolicies = 3;
                this.multiplicador = 5;
                break;

            default: // Normal
                this.opcions.temps = 40;
                this.opcions.nPolicies = 2;
                this.multiplicador = 1;
                break;
        }

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ciutat', 'tiles');
        //Es diu capa de patrones 1 perque aixi es diu al JSON, si es canvia peta
        const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);
        this.map = map; //Ho guardem pel easystar
        layer.setCollisionByProperty({ collides: true });

        // Afegim les posicions d'aparició del jugador i del/s policia/es
        const spawns = [
            {x: 0, y: 0, xP: 960, yP: 480, xP2: 960, yP2: 0, xP3: 0, yP3: 480, xM: 930 , yM: 465},
            {x: 0, y: 480, xP: 960, yP: 0, xP2: 0, yP2: 0, xP3: 960, yP3: 480, xM: 930 , yM:15},
            {x: 960, y: 0, xP: 0, yP: 480, xP2: 0, yP2: 0, xP3: 960, yP3: 480, xM: 15 , yM:465},
            {x: 960, y: 480, xP: 0, yP: 0, xP2: 960, yP2: 0, xP3: 0, yP3: 480, xM: 15 , yM: 15}
        ];

        const randomSpawn = Phaser.Math.RND.pick(spawns); // Seleccionem un punt d'aparició aleatori entre els quatre
      
        this.Policia = new Policia(this, randomSpawn.xP, randomSpawn.yP, {
            adalt: 'policiaU',
            abaix: 'policiaD',
            dreta: 'policiaR',
            esquerra: 'policiaL'
        });

        // Si estem jugant en normal o difícil, afegim un segon policia
        if(this.opcions.nPolicies > 1) {
            this.Policia2 = new Policia(this, randomSpawn.xP2, randomSpawn.yP2, {
            adalt: 'policiaU',
            abaix: 'policiaD',
            dreta: 'policiaR',
            esquerra: 'policiaL'
             });
             // Si estem jugant en difícil, afegim un tercer policia
             if(this.opcions.nPolicies > 2) {
                this.Policia3 = new Policia(this, randomSpawn.xP3, randomSpawn.yP3, {
                adalt: 'policiaU',
                abaix: 'policiaD',
                dreta: 'policiaR',
                esquerra: 'policiaL'
                });
            }
        } 

        this.meta = this.physics.add.sprite(randomSpawn.xM,randomSpawn.yM,'meta');
        this.meta.body.setImmovable(true); //Sino al tocar amb el cotxe es pot moure

        this.player = new Player(this, randomSpawn.x, randomSpawn.y, {
            adalt: 'cotxeU',
            abaix: 'cotxeD',
            dreta: 'cotxeR',
            esquerra: 'cotxeL'
        });

        //Aquests controls son estrictament pel vehicle, el tema de pausar anira fora per a evitar coses que no toquen a player
        this.controls = this.input.keyboard.addKeys({
            adalt: Phaser.Input.Keyboard.KeyCodes.W,
            abaix: Phaser.Input.Keyboard.KeyCodes.S,
            esquerra: Phaser.Input.Keyboard.KeyCodes.A,
            dreta: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Incorporem un temporitzador amb Phaser

        this.timer = this.opcions.temps // temps on comença el timer
        this.tText = this.add.text(650, 5, "Temps: " + Math.ceil(this.timer), { // imprimim el comptador per pantalla
            fontSize: "24px",
            fill: "#000000",
            fontFamily: "Lucida Console"
        });

        /*
        //Anem a crear el tilemap per a q el easystar entengui tot i el A* funcioni be  
        //console.log(EasyStar);  
        this.easystar = new window.EasyStar.js(); //Fem window per a accedir al context global, sino peta
        //console.log(map.height);
        //console.log(map.width);
        const grid = []; //Aixo sera el mapa en forma graf x algoritme
        for(let y = 0; y<map.height; y++){ //Doble bucle normal dels d mtp1
            const col = []; 
            for(let x = 0; x<map.width;x++) {
                const tile = map.getTileAt(x,y,true,'Capa de patrones 1'); //Capa de patrones ja q es el nom al json aquell
                col.push(tile.collides ? 1 : 0); //guardem si es o no caminable amb 0 i 1, no ens rallem
            }
            grid.push(col);
        }
        //Ara fem el easystar (llibreria instalada)
        
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles([0]); //Li diem q 0 es el caminable
        */
       
        //Guardem el esc per a revisar pausa
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Fiquem col·lisions a tot el que toca i les funcions pertinents
        this.physics.add.collider(this.player, layer);
        this.physics.add.collider(this.Policia, layer);
        this.physics.add.collider(this.player, this.Policia, ()=>{
            this.scene.start('final',{resultat:'D'})
        });
        this.physics.add.collider(this.player,this.meta,()=>{
            this.puntuacio = this.timer * this.multiplicador
            rankings.guardarPuntuacio(Math.round(this.puntuacio));
            this.scene.start('final',{resultat: 'V'})
        })

        // Afegim col·lisions a la resta de policies, si en tenim
        if(this.opcions.nPolicies > 1) {
            this.physics.add.collider(this.Policia2, layer);
            this.physics.add.collider(this.player, this.Policia2, ()=>{
            this.scene.start('final',{resultat:'D'})
            });

            if(this.opcions.nPolicies > 2) {
                this.physics.add.collider(this.Policia3, layer);
                this.physics.add.collider(this.player, this.Policia3, ()=>{
                this.scene.start('final',{resultat:'D'})
                 });
            }
        }
        //this.camera.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    //Aixo sera el bucle de joc!!
    update() {
        this.player.move(this.controls);
        this.Policia.seguirPlayer(this.player);

        // Programem el seguiment dels altres policies si en tenim
        if(this.opcions.nPolicies > 1) {
            this.Policia2.seguirPlayer(this.player);
            if(this.opcions.nPolicies > 2) {
                this.Policia3.seguirPlayer(this.player);
            }
        }
        //Fem just down perque nomes ens interessa agafar 1 valor
        if(Phaser.Input.Keyboard.JustDown(this.esc)){
            this.scene.launch('MenuPausa'); //Fem launch pq ens interessa conservar
            this.scene.pause();
        }

        // actualitzem el comptador cada segon
        if(this.timer > 0) {
            this.timer -= this.game.loop.delta / 1000; // cada segon baixa un valor
            if(this.timer < 0) {
                 this.timer = 0; // forcem el comptador a 0, que no segueixi baixant
                 this.scene.start('final',{resultat:'D'})
            }
            this.tText.setText('Temps: ' + Math.ceil(this.timer));
        }
    }
};
