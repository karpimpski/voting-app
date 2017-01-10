var express = require('express');
var app = express();

var mongo = require('mongodb').MongoClient;
var url = process.env.DB_URI;
var pkg = require('./package.json');

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

app.get('/api/newpoll', (req, res) => {
	mongo.connect(url, function(err,db){
		if(err) throw err;
		var name = req.query.name;
		var options = req.query.option.map(function(option){
			return {name: option, votes: 0};
		});
		db.collection('polls').insert({name: name, options: options}, function(err, doc){
			res.redirect(pkg.client + '/poll/' + doc.ops[0].name);
		});
	})
});

app.get('/api/addvote/:name/:option', (req, res) => {
	var option = req.params.option;
	mongo.connect(url, function(err, db){
		if(err) throw err;
		db.collection('polls').update(
			{name : req.params.name, "options.name":req.params.option},
			{$inc: {"options.$.votes": 1}},
			(err, doc) => {
				if(err) throw err;
				db.collection('polls').findOne({name: req.params.name}, (e, d) => {
					if(e) throw e;
					res.end(JSON.stringify(d));
				})
			}
		)
	});
});

app.listen(3001);