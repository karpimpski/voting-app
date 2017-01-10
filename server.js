var express = require('express');
var app = express();

var mongo = require('mongodb').MongoClient;
var url = process.env.DB_URI;

app.get('/api/polls', (req, res) => {
	mongo.connect(url, function(err, db) {
		if(err) throw err;
		db.collection('polls').find({}).toArray(function(err, docs){
			res.end(JSON.stringify(docs));
		});
	});
});

app.get('/api/poll/:name', (req, res) => {
	mongo.connect(url, function(err, db){
		if(err) throw err;
		db.collection('polls').findOne({"name": req.params.name}, function(err, doc){
			res.end(JSON.stringify(doc));
		});
	});
});

app.listen(3001);