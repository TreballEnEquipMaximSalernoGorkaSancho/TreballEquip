import nivell from "./nivell.js";
import Final from "./final.js";
import MenuPausa from "./menuPausa.js";
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
            gravity: {y: 0},
            debug: false
        }
  },
  scene:[nivell,Final,MenuPausa]
};

const game = new Phaser.Game(config);

