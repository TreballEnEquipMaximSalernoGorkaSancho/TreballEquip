var opcions = function(){
    const default_options = {
        dificultat:'normal'
    };
    
    var dificultat = $('#dif');
    var config = JSON.parse(localStorage.opcions||JSON.stringify(default_options));
    dificultat.on('change',()=>config.dificultat = dificultat.val());
    dificultat.val(config.dificultat);


    return { 
        applyChanges: function(){
            localStorage.opcions = JSON.stringify(config);
        },
        defaultValues: function(){
            config.dificultat = default_options.dificultat;
            dificultat.val(config.dificultat);
        }
    }
}();

$('#default').on('click',function(){
    opcions.defaultValues();
});

$('#apply').on('click',function(){
    opcions.applyChanges();
    location.assign("../");
});