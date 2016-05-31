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
        console.log("--Build Ship");
        Ships.refresh(function() {
            var n = Ships.list.length;
            n++;
            Ships.buildShip(getCheapestModel(), getRandomCity().slug, "Golden Heart MK-" + n, function(err, res) {
                Ships.refresh(function() {
                    if(!err) console.log("OK");
                    return done(err);
                });
            });
        });
    },
    moveShip: function(ship,done){
        console.log("--Move Ship");
        var c=getRandomCity();
        while(c===ship.city) c=getRandomCity();
        Ships.moveShip(ship,c.slug,function(err,res){
            if(!err) console.log("OK");
            return done(err);
        });
    },
    tradeProducts: function(ship,done){
        console.log("--Trade Products");
        Ships.getShip(ship,function(err,res){
            if(err) return done(err);
            var s=res;
            Map.getCityProducts(s.city,function(err,res){
                if(err) console.log(err);
                var c=res;
                console.log(s);
                console.log(c);
                Ships.buyProduct(s.slug,"timber",1,function(err,res){
                    console.log(err);
                    console.log(res);
                    Ships.sellProduct(s.slug,"timber",1,function(err,res){
                    console.log(err);
                    console.log(res);
                    done();
                });
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
            if(err) console.log(err);
            actions.tradeProducts(Ships.list[0],function(err,res){
                console.log(err);
            });
        });
    });
};
