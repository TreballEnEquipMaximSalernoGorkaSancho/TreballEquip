addEventListener('load', function() {
    document.getElementById('jugarBoto').addEventListener('click', 
    function(){
        window.location.assign("./html/game.html");
    });

    document.getElementById('opcionsBoto').addEventListener('click',
    function(){
        window.location.assign("./html/opcions.html");
    });


    document.getElementById('sortirBoto').addEventListener('click', 
    function(){
       window.close();
    });
});

