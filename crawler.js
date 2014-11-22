var cheerio = require('cheerio');
var https = require('https');
var http = require('http');

module.exports = function (config) {
    return function (url, callback) {
        var protocol = http;
        if (/^https:\/\//.test(url)) {
            protocol = https;
        }
        protocol.get(url, function (res) {
            var pageHTML = '';
            res.on('data', function (chunk) {
                pageHTML += chunk;
            });
            res.on('end', function () {
                var $ = cheerio.load(pageHTML);
                var element = $('td.title > a').first();
                var url = element.attr('href');
                var title = element.text();
                callback(null, title, url);
            });
        }).on('error', function (err) {
            callback(err);
        });
    };
};