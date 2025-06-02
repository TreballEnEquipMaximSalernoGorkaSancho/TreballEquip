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

    /* 
        Tot el algoritme d'abaix basicament es resumeix en q pillem la pos del policia i la del player, doncs pillem el path del easystar
        i mirem quina es la seguent posicio, q sera path[1], i ens movem cap a ella. Fem path[1] ja que aquesta funcio la fem tot el rato i aixi
        ja funciona be
        Els clamp son pq si estem just al borde del mapa, per temas de com va el easystar aquest reventa, aixi q fem el clamp i pillem el q ens sembli millor
        (es a dir, si es <0 torna 0 i si >max torna max )
    */

    seguirPlayer(player) {
        
        const velocitat = 150;
        const maxAmplada = this.scene.map.width;
        const maxAlçada = this.scene.map.height;
        /*
        this.scene.physics.moveToObject(this,player,velocitat);
        */
       //Guardem la XY de policia i player per a fer tot
       const poliX = Phaser.Math.Clamp(this.scene.map.worldToTileX(this.x),0,maxAmplada-1); //Important el -1 q es el q evita errors
       const poliY = Phaser.Math.Clamp(this.scene.map.worldToTileX(this.y),0,maxAlçada-1);
       const playerX = Phaser.Math.Clamp(this.scene.map.worldToTileX(player.x),0,maxAmplada-1);
       const playerY = Phaser.Math.Clamp(this.scene.map.worldToTileX(player.y),0,maxAlçada-1);

       this.scene.easystar.findPath(poliX,poliY,playerX,playerY,(path)=>{
            if(path && path.length > 1){ //basicament que existeixi un cami i que no estem sobre el player respectivament
                const monX = this.scene.map.tileToWorldX(path[1].x);
                const monY =  this.scene.map.tileToWorldY(path[1].y);
                this.scene.physics.moveTo(this,monX,monY,velocitat);
            } else{
                this.body.setVelocity(0,0); //Aixo sera si no tenim cami
            }
       }); //Tot aixo es x definir el cami q farem
       this.scene.easystar.calculate(); //Important pq sino de poc serveix el reste
    }

}