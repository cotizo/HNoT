var redis = require('redis');

module.exports = function (config) {
    var lastValue = null;
    var rc = null;
    var redisKey = null;
    if (config.hasOwnProperty("redis")) {
        rc = redis.createClient(
            config["redis"]["port"],
            config["redis"]["host"]);
        redisKey = config["redis"]["key"];
    }

    return function (value, callback) {
        if (rc) {
            rc.get(redisKey, function (err, lastValue) {
                var result = ! (lastValue === value);
                rc.set(redisKey, value);
                callback(null, result);
            });
        } else {
            var result = ! (lastValue === value);
            lastValue = value;
            callback(null, result);
        }
    }
};