import nivell from "./nivell.js";

const config = {
    type: Phaser.auto,
    width:800,
    height: 600,
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