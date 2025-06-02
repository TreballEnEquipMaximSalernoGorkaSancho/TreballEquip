export default class MenuPausa extends Phaser.Scene {
    constructor(){
        super('MenuPausa')
    }


    create() {
        this.add.rectangle(480,240,480,480,0x00000,0.5);
        //Per indicar que esta pausat
        this.add.text(480,200,'PAUSA', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const reanudar = this.add.text(480,260,'Reanudar',{
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        reanudar.on('pointerdown',()=>{
            this.scene.stop();
            this.scene.resume('nivell'); //Nivell el pausem a nivell
        });

    }

}