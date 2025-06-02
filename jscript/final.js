export default class Final extends Phaser.Scene {
    constructor(){
        super("final");
    }

    preload(){
        this.load.image('gameOver','../assets/Pantalles/pantallaFinal.png')
    };

    create(){

        this.add.image(240,240,'gameOver').setDisplaySize(1450,480);
        const textFinal = this.add.text(435,160,"Has Perdut!",{
            fontsize: '48px',
            color: '#ff0000',
            stroke: '#ff0000',
            strokeThickness: 2
        });

        this.tweens.add({
            targets: textFinal,
            scale: {from: 1, to: 1.1},
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        const botoRein = this.add.text(440,240,'Reiniciar',{
            fontsize: '32px',
            color: '#ff0000',
            backgroundColor: '#ffffff',
            padding: {x:10,y:5}
        }).setInteractive()
        .on('pointerover',()=> botoRein.setStyle({backgroundColor:'#444444'})) //Fem que al pasar per sobre el ratoli faci coses
        .on('pointerout',()=> botoRein.setStyle({backgroundColor:'#ffffff'})); //Fem que al treure el ratoli faci coses


        botoRein.on('pointerdown',()=>{
            this.scene.start('nivell');
        });

        const botoMenu = this.add.text(420,320,'Menu Principal',{
            fontsize: '32px',
            color: '#ff0000',
            backgroundColor: '#ffffff',
            padding: {x:10,y:5}
        }).setInteractive()
        .on('pointerover',()=> botoMenu.setStyle({backgroundColor:'#444444'})) 
        .on('pointerout',()=> botoMenu.setStyle({backgroundColor:'#ffffff'}));
        botoMenu.on('pointerdown',()=>{
            window.location.assign("../index.html");
        })


    }

}