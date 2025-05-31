addEventListener('load', function() {
    document.getElementById('jugarBoto').addEventListener('click', 
    function(){
        window.location.assign("./html/game.html");
    });

    document.getElementById('sortirBoto').addEventListener('click', 
    function(){
       window.close();
    });
});

