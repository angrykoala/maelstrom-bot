var Map = require('./app/map');
var ShipModels = require('./app/shipModels');
var Login=require('./app/login');

Map.refresh(function() {
    console.log(Map.list);
    ShipModels.refresh(function() {
        console.log(ShipModels.list);
        Login.refresh(function(){
            console.log(Login.token);
        });
    });
});
