var config = require('./config.json');
var CronJob = require('cron').CronJob;

var crawler = require('./crawler')(config)
  , twitter = require('./twitter')(config)
  , filter = require('./filter')(config);

function execute(callback) {
    console.log("Starting job at: " + new Date());
    crawler("https://news.ycombinator.com/", function (err, title, url) {
        if (err) { console.error("Crawler error: " + JSON.stringify(err)); return; }
        var tweet = title + ": " + url;
        filter(tweet, function (err, isDifferent) {
            if (err) { console.error("Filter error: " + JSON.stringify(err)); return; }
            if (isDifferent) {
                console.log("Posting: " + tweet);
                twitter(title + ": " + url, function (err, data) {
                    if (err) { console.error("Twitter error: " + JSON.stringify(err)); return; }
                    console.dir(data);

                    if (typeof callback === "function") {
                        callback();
                    }
                });
            } else {
                console.log("The tweet did not change");

                if (typeof callback === "function") {
                    callback();
                }
            }
        })
    });
}

var job = new CronJob(config["cron"], execute, true, "Europe/Zurich");