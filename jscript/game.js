const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload: preload,
    create: create,
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('tiles', '../mapa/tilemap.png');
  this.load.tilemapTiledJSON('map', '../mapa/prova2.json');
}

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('ciutat', 'tiles');
  const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);
  
  
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}
