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
        this.scene.physics.moveToObject(this,player,velocitat);
        /*
       //Guardem la XY de policia i player per a fer tot
       if(!this.timerMoure || this.timerMoure <= 0 ){ //Limitem cada cuan fa tot per a evitar cargar massa tot
       const maxAmplada = this.scene.map.width;
       const maxAlçada = this.scene.map.height;
       const poliX = Phaser.Math.Clamp(this.scene.map.worldToTileX(this.x),0,maxAmplada-1); //Important el -1 q es el q evita errors
       const poliY = Phaser.Math.Clamp(this.scene.map.worldToTileY(this.y),0,maxAlçada-1);
       const playerX = Phaser.Math.Clamp(this.scene.map.worldToTileX(player.x),0,maxAmplada-1);
       const playerY = Phaser.Math.Clamp(this.scene.map.worldToTileY(player.y),0,maxAlçada-1);


       this.scene.easystar.findPath(poliX,poliY,playerX,playerY,(path)=>{
            this.path = path; //El path en si
            this.pathI = 1; //Seguent punt on volem anar
       }); //Tot aixo es x definir el cami q farem
       this.scene.easystar.calculate(); //Important pq sino de poc serveix el reste
       this.timerMoure = 20;
        }else{
            this.timerMoure--;
        }
        if(this.path && this.path.length > this.pathI){ //Mirem de tenir path i que el punt seguent estigui dins dels limits
            const seguentPos = this.path[this.pathI];
            const monX = this.scene.map.tileToWorldX(seguentPos.x)+this.scene.map.tileWidth/2; //Sumem amplada pq per defecte pille el borde abaix esquerra i dona problemes
            const monY = this.scene.map.tileToWorldY(seguentPos.y)+this.scene.map.tileHeight/2;//mateix q adalt pero amb alçada
            this.scene.physics.moveTo(this,monX,monY,velocitat); //ens movem

            const distancia = Phaser.Math.Distance.Between(this.x,this.y,monX,monY); //Distancia entre player i poli per a veure q fer
            if(distancia < 3){ //Si estem aprop
                this.pathIndex++;
            }
        }else{ //Si no tenim cami o el seguent punt es invalid
            this.body.setVelocity(0,0); 
        }
        */
    }

}