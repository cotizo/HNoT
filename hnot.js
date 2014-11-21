var crawler = require('./crawler');

crawler("https://news.ycombinator.com/", function (err, title, url) {
    if (err) { console.error(err); return; }
    console.log(title + " -> " + url);
});