var request = require('superagent');

var config = require('../config/config');

var Login = {
    token: "",
    refresh: function(done) {
        request.post(config.userUrl + '/login')
            .send(config.user)
            //  .set('X-API-Key', 'foobar')
            //  .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    setTimeout(function() {
                        this.refresh(done);
                    }.bind(this), 1000);
                } else {
                    this.token = res.body;
                    done();
                }
            }.bind(this));
    }
};

module.exports = Login;
