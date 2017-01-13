var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = process.env.DB_URI;
var pkg = require('./package.json');
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/build'));
var client;
process.argv[3] ? client = 'http://localhost:'+process.argv[3] : client = '';
var port;
process.argv[2] ? port = +process.argv[2] : port = process.env.PORT;

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

app.get('/api/delete/:name', (req, res) => {
	var name = req.params.name;
	mongo.connect(url, function(err, db){
		if(err) throw err;
		db.collection('polls').remove({name: name}, function(err, doc){
			if(err) throw err;
			res.end(JSON.stringify(doc))
		});
	});
});

app.patch('/api/addvote/', (req, res) => {
	var option = req.body.option;
	mongo.connect(url, function(err, db){
		if(err) throw err;
		db.collection('polls').update(
			{name : req.body.name, "options.name":req.body.option},
			{$inc: {"options.$.votes": 1}},
			(err, doc) => {
				if(err) throw err;
				db.collection('polls').findOne({name: req.body.name}, (e, d) => {
					if(e) throw e;
					res.end(JSON.stringify(d));
				})
			}
		)
	});
});

app.post('/api/newpoll', (req, res) => {
	mongo.connect(url, function(err,db){
		if(err) throw err;
		var name = req.body.name;
		var options = req.body.option.filter(opt => opt !== '').map(opt => {return {name: opt, votes: 0}});
		db.collection('polls').insert({name: name, options: options}, function(err, doc){
			console.log(client);
			res.redirect(client + '/poll/' + encodeURIComponent(doc.ops[0].name));
		});
	})
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.listen(port);