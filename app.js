var Map = require('./app/map');
var ShipModels = require('./app/shipModels');
var Login = require('./app/login');
var Ships = require('./app/ships');

Map.refresh(function() {
    console.log(Map.list);
    Map.getCity(Map.list[0],function(err,res){
        if(err) console.log(err);
        console.log(res);
    ShipModels.refresh(function() {
        console.log(ShipModels.list);
        Login.refresh(function() {
            console.log(Login.token);
            Ships.refresh(function() {
                console.log(Ships.list);
                Ships.getShip(Ships.list[0],function(err,res){
                    if(err) console.log(err);
                    console.log(res);
                });
            });
            });
        });
    });
});
