var request = require('superagent');

var config=require('../config/config');

var Map = {
    list: [],
    refresh: function(done) {
        request.get(config.worldUrl+'/map')
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
    getCity: function(city,done){
        if(!city || city.slug) return done(new Error("Not valid city"));
        request.get(config.worldUrl+'/city/'+city.slug)
            .end(function(err, res) {
                    return done(err,res.body);
            });
    }
};

module.exports = Map;
