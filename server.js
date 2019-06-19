var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');
var rkd = require('./parseToJson');

http.createServer(function (req, res) {
if(req.url == "/"){
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
} else if(req.url == "/js/search.js"){
   fs.readFile('js/search.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
} else if(req.url == "/js/main.js"){
   fs.readFile('js/main.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
} else if(req.url == "/js/parseToJson.js"){
   fs.readFile('js/parseToJson.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
} else if(req.url == "/css/stylesheet.css"){
   fs.readFile('css/stylesheet.css', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });
} else if(req.url == "/images/logoartbase.jpeg"){
   fs.readFile('images/logoartbase.jpeg', function(err, data) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.write(data);
    res.end();
  });
} else if(req.url.includes("/rkdcall")){
    var q = url.parse(req.url.replace("rkdcall", ""), true).query;
    res.writeHead(200, {'Content-Type': 'application/json'});
    rkd.rkdCall(q.fName, q.lName, function(data){
      res.end(JSON.stringify(data));
    });
} else if(req.url.includes("/artwork.php?")){
    res.writeHead(301, { "Location": "https://lootedart.com/search" + req.url});
    res.end();
} else if(req.url.includes("/images/ThumbNails/")){
    res.writeHead(301, { "Location": "https://lootedart.com" + req.url});
    res.end();
} else if(req.url.includes("/Webs/EN")){
    res.writeHead(301, { "Location": "http://www.lostart.de" + req.url});
    res.end();
} else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write("Not found");
    res.end();
}
}).listen(8080);
