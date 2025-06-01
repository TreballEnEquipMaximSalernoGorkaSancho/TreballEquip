export default class Policia extends Phaser.Physics.Arcade.Sprite {
    //Sera molt similar a player pero en comptes de controls suposo q entrare la pos de player o algo
        constructor(escena,x,y,textura) {
        //Li donem una textura per defecte per a evitar reventar el joc
        super(escena,x,y,textura.esquerra);

        escena.add.existing(this);
        escena.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        //Tamany hitbox
        this.body.setSize(30,20);

        //Descomentar el codi d'abaix si la hitbox queda descentrada respecte el sprite
        //this.body.setOffset(10,10)

        //Guardem per a tenir tot bacano
        this.textura = textura
    }

    move(pX,pY) {

    }

}