var request = require('superagent');

var config=require('../config/config');

var ShipModels = {
    list: [],
    refresh: function(done) {
        request.get(config.worldUrl+'/ship_models')
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
    }
};

module.exports = ShipModels;
