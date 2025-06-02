import nivell from "./nivell.js";
import Final from "./final.js";

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
            gravity: {y: 0},
            debug: true
        }
  },
  scene:[nivell,Final]
};

const game = new Phaser.Game(config);

