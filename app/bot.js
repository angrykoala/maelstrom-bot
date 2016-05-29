var Map = require('./map');
var Login=require('./login');
var ShipModels = require('./shipModels');
var Ships=require('./ships');
var User=require('./user');

function initialize(done) {
    Map.refresh(function() {
        ShipModels.refresh(function() {
            Login.refresh(function() {
                Ships.refresh(function() {
                    User.refresh(function(){
                    console.log("Bot Started");
                    done();
                });
                });
            });
        });
    });
}

function getRandomCity() {
    if (Map.list.length === 0) return null;
    var c = Map.list[Math.floor(Math.random() * Map.list.length)];
    return c;
}

function getCheapestModel() {
    var res = null;
    var val = null;
    for (var i = 0; i < ShipModels.list.length; i++) {
        var b = ShipModels.list[i];
        if (!val || val > b.price) {
            res = b;
            val = b.price;
        }
    }
    return res;
}


var actions = {
    buildShip: function(done) {
        console.log("--Building Ship");
        Ships.refresh(function() {
            var n = Ships.list.length;
            n++;
            Ships.buildShip(getCheapestModel(), getRandomCity(), "Golden Heart MK-" + n, function(err, res) {
                Ships.refresh(function() {
                    if(!err) console.log("OK");
                    return done(err);
                });
            });
        });
    }
};

var heuristics = {
    build: function() {
        if(Ships.list.length===0 && getCheapestModel().price<=User.money) return true;
        else return false;

    }
};

function bindAction(heuristic,action,next){
    if(heuristic()) return action(next);
    else return next();
}

module.exports = function() {
    initialize(function() {
        bindAction(heuristics.build,actions.buildShip,function(err){
            if(err) console.err(err);

        });
    });
};
