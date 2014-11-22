var config = require('./config.json');

var crawler = require('./crawler')(config)
  , twitter = require('./twitter')(config);


crawler("https://news.ycombinator.com/", function (err, title, url) {
    if (err) { console.error(err); return; }
    twitter(title + ": " + url, function (err, data) {
        if (err) { console.error(err); return; }
        console.dir(data);
    });
});