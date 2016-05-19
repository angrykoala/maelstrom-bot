var Map = require('./app/map');
var ShipModels = require('./app/shipModels');

Map.refresh(function() {
    console.log(Map.list);
    ShipModels.refresh(function() {
        console.log(ShipModels.list);
    });
});
