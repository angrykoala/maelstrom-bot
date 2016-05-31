var request = require('superagent');

var config = require('../config/config');
var Login = require('./login');

var Ships = {
    list: [],
    refresh: function(done) {
        request.get(config.worldUrl + '/user/ships')
            .set('Authorization', "Bearer " + Login.token)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    setTimeout(function() {
                        this.refresh(done);
                    }.bind(this), 1000);
                } else {
                    this.list = res.body;
                    done();
                }
            }.bind(this));
    },
    getShip: function(ship, done) {
        if (!ship || !ship.slug) return done(new Error("Not valid ship"));
        var id = ship.slug;
        request.get(config.worldUrl + '/user/ship/' + id)
            .set('Authorization', "Bearer " + Login.token)
            .end(function(err, res) {
                return done(err, res.body);
            });
    },
    moveShip: function(ship, city, done) {
        if (!ship || !ship.slug) return done(new Error("Not valid ship"));
        if(!city || !city.slug) return done(new Error("Not valid city"));
        var id = ship.slug;
        if(city===ship.city) return done(new Error("City===Destiny"));
        request.post(config.worldUrl + '/user/move/ship/')
            .set('Authorization', "Bearer " + Login.token)
            .send({ship:ship.slug,city:city.slug})
            .end(function(err, res) {
                return done(err, res.body);
            });
    },
    buyProduct: function(ship, product,quantity, done) {
        if(!ship || !product) return done(new Error("Not valid data"));
        cb=this.refresh;

        request.put(config.worldUrl+'/user/buy')
            .set('Authorization', "Bearer " + Login.token)
            .send({ship:ship,product:product,quantity:quantity})
            .end(function(err, res) {
                return done(err, res.body);
            });
    },
    sellProduct: function(ship, product,quantity, done) {
        if(!ship || !product) return done(new Error("Not valid data"));
        cb=this.refresh;

        request.put(config.worldUrl+'/user/sell')
            .set('Authorization', "Bearer " + Login.token)
            .send({ship:ship,product:product,quantity:quantity})
            .end(function(err, res) {
                return done(err, res.body);
            });

    },
    buildShip:function(shipModel,city,name,done){
        if(!shipModel || !shipModel.slug || !city || !name) return done(new Error("Not valid data"));
        cb=this.refresh;

        request.put(config.worldUrl+'/user/build/ship')
            .set('Authorization', "Bearer " + Login.token)
            .send({model:shipModel.slug,city:city,ship_name:name})
            .end(function(err, res) {
                return done(err, res.body);
            });
    }
};

module.exports = Ships;
