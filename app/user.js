var Login=require('./login');
var request = require('superagent');
var config=require('../config/config');

module.exports={
    money:null,
    data:{},
    refresh: function(done) {
        request.get(config.worldUrl + '/user/data')
            .set('Authorization', "Bearer " + Login.token)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    setTimeout(function() {
                        this.refresh(done);
                    }.bind(this), 1000);
                } else {
                    this.data = res.body;
                    this.money=res.body.money;
                    done();
                }
            }.bind(this));
    },
};
