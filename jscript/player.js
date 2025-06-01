export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(escena,x,y,textura) {
        super(escena,x,y,textura);

        escena.add.existing(this);
        escena.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        //Tamany hitbox
        this.body.setSize(40,20);

        //Descomentar el codi d'abaix si la hitbox queda descentrada respecte el sprite
        //this.body.setOffset(10,10)
    }

    move(controls) {
        const velocitat = 200;
        this.setVelocity(0);
        if(controls.esquerra.isDown){
            this.setVelocityX(-velocitat);
            this.body.setSize(40,20);
            //Fer canvi sprite a esquerra
        }
        else if(controls.dreta.isDown){
            this.setVelocityX(velocitat);
            this.body.setSize(40,20);
            //Fer canvi sprite a dreta
        }
        //Aqui fem if i no else if per a poder fer moviments diagonals
        if(controls.abaix.isDown){
            this.setVelocityY(velocitat); //Per alguna rao abaix es positiu
            this.body.setSize(20,40);
            //Fer canvi sprite a abaix
        }
        else if(controls.adalt.isDown){
            this.setVelocityY(-velocitat);
            this.body.setSize(20,40);
            //Fer canvi sprite a adalt
        }
    }
}

