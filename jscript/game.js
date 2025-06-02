import nivell from "./nivell.js";

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
  scene:[nivell]
};

const game = new Phaser.Game(config);

