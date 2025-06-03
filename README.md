# TreballEquip
El treball en equip

Introducció:
Aquest es el nostre joc, Avocado Heist, un joc de persecucions que hem desenvolupat fent servir JQuery,Phaser 3 i easystar, encara que aquesta ultima llibreria no ha funcionat gaire be.
Tambe hem fet servir Tiled per a la creació del mapa i l'apliació de propietats sobre aquest.
Pel tema del mapa, volem donar els credits a Kenney, ja que hem fet servir uns assets seus que ens han funcionat genial per poder crear el nostre mapa tile a tile.

RPG Urban Pack 1.0

    Created/distributed by Kenney (www.kenney.nl)
    Creation date: 05-01-2019

            ------------------------------

    License: (Creative Commons Zero, CC0)
    http://creativecommons.org/publicdomain/zero/1.0/

    This content is free to use in personal, educational and commercial projects.
    Support us by crediting Kenney or www.kenney.nl (this is not mandatory)

Descripció del disseny del joc:

El joc consisteix en un mapa rectangular. El jugador farà spawn aleatòriament a una de les 4 cantonades, i els policies apareixeran a les altres. 
L'objectiu del jugador serà anar a la cantonada contrària d'on ha spawneat, on trobarem la meta. 
El contacte amb els policies o arribar a 0 segons de comptador donaran com a resultat la derrota, i tocar la meta donarà com a resultat victòria. 
Només es guardarà la puntuació si guanyem la partida, i trobarem les puntuacions en ordre a rànking.
El nombre de policies dependrà de la dificultat del joc. També afectarà al multiplicador de la puntuacio i al temps.

Fàcil -> 1 policia , 60 segons , 0.5 multiplicador
Normal -> 2 policies , 40 segons , 1 multiplicador
Difícil -> 3 policies , 20 segons , 5 multiplicador

Descripció de les parts més rellevants de la implementació

El joc consisteix en diverses clases, pero les mes importants son player,nivell i policia.

Player: És el jugador, la classe crea un jugador a una posició donada de l'escena, s'apliquen unes textures i hitbox, i només te 1 mètode, move(control), on entrem un control creat a nivell i
depenent de quin control sigui el vehicle del jugador es moura cap a la direcció donada i el sprite canviarà per a mostrar l'sprite adient pel moviment.

Policia: La creació es igual a player, pero té un mètode que es seguirplayer(player), que fa un moveToObject de player. Es parlarà en més profunditat d'aquest metode a l'apartat de problemes.

Nivell: Aquí trobem tota la lògica del joc junta. Aquesta classe fa preload dels sprites i mapa, crea tot, controls, vehicles, aplica la dificultat, crea el comptador, la meta, defineix les col·lisions,
"decideix" els spawns, genera els controls (tant de vehicle com pel menu de pausa), i finalment, es va actualitzant constantment per a fer que els policies es moguin, el timer baixi, i es comprovi si es vol
pausar el joc.


Conclusions i problemes trobats
Primer de tot, els problemes.
Encara que hem anat trobant problemes durant la implementació, hem pogut sol·lucionar tots menys un, relacionat amb el pathfinding dels policies.
A nivell i a policia trobarem blocs de codi comentats, ja que no funcionen correctament, i tots estan relacionats amb easystar i el metode seguirjugador.
Vam intentar fer servir un algoritme A* pel seguiment del jugador, ja que aixi fariem la persecució més "realista", pero al aplicar tots els canvis per a adaptar el joc a easystar, vam veure que el comportament
dels policies era erràtic i incorrecte, molts cops quedant-se encallat, donant voltes sobre si mateix, o senzillament parat. Vam provar implementar un timer pel policia i aixi evitar que anes calculant constantment 
el path, i intentar alliberar carga de tal manera que funcionés més fluït, pero no va funcionar. Tambe vam fer comprovacions de si teniem camí possible o correcte, pero seguia fent coses rares. Vam fer servir Clamp per a
evitar que calcules malament al estar aprop de la vora del mapa, ja que sino el joc no funcionava degut a problemes amb la llibreria, pero seguia sense funcionar.
Doncs, degut a tots aquests problemes, vam decidir prescindir d'aquesta funcionalitat, pero vam decidir comentar el codi per si en algun moment descobriem com arregalr tot, cosa que no va pasar.

Ara, apart d'aquest problema, no hi ha hagut cap altre de significatiu, i per tant ens donarem amb les conclusions.

En conclusió, ens ha agradat bastant aquesta pràctica. Hem descobert part del potencial de github, ja que a les practiques individuals no es podia treure tant de suc a aquest, pero al treballar en grup es fa molt còmode.
També hem après en part el pensament al desenvolupar un joc, dividint tot en diferents funcionalitats i anar-les provant una a una. També, el disseny del joc ha canviat lleugerament del que en un principi habiem pensat,
ja que idees que en un inici teniem hem vist que no encaixen del tot amb el que estabem fent. Per exemple, hem prescindit de la idea de poder disparar, ja que si la idea es fer una persecució i escapar, no té lògica el
poder estar combatint, ja que "trenca" amb el joc, que es una persecució.
En general, l'hem trobat una bona pràctica.

Manual d'usuari
Moviment:
W -> Moure's amunt
S -> Moure's aball
A -> Moure's esquerra
D -> Moure's dreta
ESC -> Pausar joc

Les dificultats estan al menu d'opcions.
Els rànkings a ranking.



