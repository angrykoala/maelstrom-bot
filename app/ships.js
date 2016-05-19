var request = require('superagent');

var config=require('../config/config');
var Login=require('./login');

var Ships = {
    list: [],
    refresh: function(done) {
        request.get(config.worldUrl+'/user/ships')
            .set('Authorization', "Bearer " + Login.token)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    setTimeout(function(){
                        this.refresh(done);
                    }.bind(this), 1000);
                } else {
                    this.list = res.body;
                    done();
                }
            }.bind(this));
    },
    getShip: function(ship,done){
        if(!ship || !ship.slug) return done(new Error("Not valid ship"));
        var id=ship.slug;
        request.get(config.worldUrl+'/user/ship/'+id)
            .set('Authorization', "Bearer " + Login.token)
            .end(function(err, res) {
                    return done(err,res.body);
            });
    }
};

module.exports = Ships;
