var twitter = require('node-twitter');


module.exports = function (config) {
    var T = new twitter.RestClient(
        config["consumerKey"],
        config["consumerSecret"],
        config["token"],
        config["tokenSecret"]);

    return function (status, callback) {
        T.statusesUpdate({ status: status }, callback);
    };
};
