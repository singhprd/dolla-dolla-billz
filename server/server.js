var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dolla_dolla_db';

app.use(express.static('../client/build'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/portfoliojson', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio');
    portfolio.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
});


app.post('/portfoliojson', function(req, res) {
  console.log('body', req.body);
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log(err);
        return;
      }
      var portfolio = db.collection('portfolio');
      portfolio.insert({
        "name": req.body.name,
        "epic": req.body.epic,
        "price": req.body.price,
        "quantity": req.body.quantity,
        "buyPrice": req.body.buyPrice,
        "pastCloseOfDayPrices": req.body.pastCloseOfDayPrices,
        "buyDate": req.body.buyDate
      });
    });
  res.send('post completed');
  res.status(200).end();
  db.close(); 
});