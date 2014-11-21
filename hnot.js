var crawler = require('./crawler'),
    config = require('./config.json'),
    twitter = require('node-twitter'),
    T = new twitter.RestClient(
        config["consumerKey"],
        config["consumerSecret"],
        config["token"],
        config["tokenSecret"]);


crawler("https://news.ycombinator.com/", function (err, title, url) {
    if (err) { console.error(err); return; }
    T.statusesUpdate({
        status: title + ": " + url
    }, function (err, data) {
        if (err) { console.error(err); return; }
        console.log(data);
    });
});