export default class Final extends Phaser.Scene {
    constructor(){
        super("final");
    }

    preload(){
        this.load.image('gameOver','../assets/Pantalles/pantallaFinal.png')
        this.load.image('gameWon','../assets/Pantalles/pantallaVictoria.png');
    };

    init(R){
        this.resultat = R.resultat
    }


    create(){
        const imatge = this.resultat === 'V' ? 'gameWon' : 'gameOver'
        const missatgeRes = this.resultat === 'V' ? "Has Guanyat!" : "Has Perdut!"; //Si ho es fem el primer, sino el segon
        const colorRes = this.resultat === 'V' ? '#00ff00' : '#ff0000';
        const colorStroke = this.resultat ==='V' ? '#00ff00' : '#ff0000'

        this.add.image(240,240,imatge).setDisplaySize(1450,480);

        const textFinal = this.add.text(435,160,missatgeRes,{
            fontsize: '48px',
            color: colorRes,
            stroke: colorStroke,
            strokeThickness: 2
        });
        //Aixo es visual, per a que faci l'efecte de creixer i disminuir
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