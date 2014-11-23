

module.exports = function (config) {
    var lastValue = null;
    return function (value, callback) {
        var result = ! (lastValue === value);
        lastValue = value;
        callback(null, result);
    }
};