export default class Player extends Phaser.Physics.Arcade.Sprite{
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

    move(controls) {
        const velocitat = 200;
        this.setVelocity(0);
        if(controls.esquerra.isDown){
            this.setVelocityX(-velocitat);
            this.body.setSize(30,20);
            this.setTexture(this.textura.esquerra);
        }
        else if(controls.dreta.isDown){
            this.setVelocityX(velocitat);
            this.body.setSize(30,20);
           this.setTexture(this.textura.dreta);
        }
        //Aqui fem if i no else if per a poder fer moviments diagonals
        if(controls.abaix.isDown){
            this.setVelocityY(velocitat); //Per alguna rao abaix es positiu
            this.body.setSize(20,30);
            this.setTexture(this.textura.abaix);
        }
        else if(controls.adalt.isDown){
            this.setVelocityY(-velocitat);
            this.body.setSize(20,30);
            this.setTexture(this.textura.adalt);
        }
    }
}

