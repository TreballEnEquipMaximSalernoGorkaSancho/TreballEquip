import { Player } from "./player.js";
export default class nivell extends Phaser.Scene {
    constructor(){
        super('nivell');
    }

    preload(){
        //this.preload.image('player',refAsset) haurem de fer aixo per a carregar tot
    }

    create(){

        this.player = new Player(this,400,300,'player');

        this.controls = this.input.keyboard.addKeys({
            //Les lletres estan en mayuscula perque sino a phaser no li agrada
            adalt: Phaser.Input.Keyboard.KeyCodes.W,
            abaix: Phaser.Input.Keyboard.KeyCodes.S,
            esquerra: Phaser.Input.Keyboard.KeyCodes.A,
            dreta: Phaser.Input.Keyboard.KeyCodes.D
        });
        }
    

    update() {
        this.player.move(this.controls)
    }
};