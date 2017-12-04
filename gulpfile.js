var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var connect = require('gulp-connect');
var fs = require('fs');
var qs = require('qs')
var database = fs.readFileSync('./json/json.json').toString();
gulp.task('mockserver', function () {
    gulp.src('.')
        .pipe(webserver({
            port: 3000,
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*')
                var method = req.method;
                var url = url.parse(req.url);
                var pathname = url.pathname;
                if (method === 'GET') {
                    switch (pathname) {
                        case '/home':
                        setHeader('content/type', 'text/html;charset=utf-8');
                        res.writh('<p>我是home页</p>');
                        res.end();
                        break;
                        case '/goodlist':
                        setHeader('content/type', 'application/json;charset=utf-8');
                        res.writh(JSON.parse(database));
                        console.log(JSON.stringify(database))
                        res.end();
                        break;
                    }
                }
            }
        }))
})
gulp.task('default', ['mockserver']);