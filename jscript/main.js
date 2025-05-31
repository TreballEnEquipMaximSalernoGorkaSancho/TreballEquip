import nivell from "./nivell.js";

const config = {
    type: Phaser.AUTO,
    width:480,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: [nivell]
};

const joc =  new Phaser.Game(config);