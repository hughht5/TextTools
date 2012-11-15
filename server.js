var express = require('express');
var app = express();

// app.get('/hello.txt', function(req, res){
  // res.send('Hello World');
// });

app.get('/', function(req,res) {
  res.sendfile('public/index.html');
});

app.listen(3000);
console.log('Listening on port 3000');

