import { rankings } from './logicaRanking.js';
//Es el mateix q a la practica individual, funciona en teoria
(function($) {
    const container = $('#rankings');

    if (container) {
        rankings.crearRanking(container);
    }    
})(jQuery)
addEventListener('load', function() {
    document.getElementById('sortir').addEventListener('click', 
    function(){
        window.location.assign("../index.html");
    });

});

