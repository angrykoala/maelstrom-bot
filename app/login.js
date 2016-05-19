var request = require('superagent');

var userConfig = require('../config/user');
var config=require('../config/config');

var Login = {
    token: "",
    refresh: function(done) {
        request.post(config.userUrl + '/login')
            .send(userConfig)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    setTimeout(function() {
                        this.refresh(done);
                    }.bind(this), 1000);
                } else {
                    this.token = res.body.token;
                    done();
                }
            }.bind(this));
    }
};

module.exports = Login;
