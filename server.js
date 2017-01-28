var express = require('express');
var app = express();
var pkg = require('./package.json');
var path = require('path');
var {ObjectId} = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



 
var objectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;
var client;
process.argv[3] ? client = 'http://localhost:'+process.argv[3] : client = '';
var port;
process.argv[2] ? port = +process.argv[2] : port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'aglhsha;asgq351021hgadlbvagq723ntaskg1',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('client/build'));

var Poll = require('./models/poll.js');

app.get('/api/polls', (req, res) => {
	Poll.find({}, function(err, polls){
		if(err) throw err;
		res.end(JSON.stringify(polls));
	})
});

app.get('/api/poll/:name', (req, res) => {
	Poll.findOne({name: req.params.name}, function(err, poll){
		if(err) throw err;
		res.end(JSON.stringify(poll));
	});
});

app.delete('/api/delete/:name', (req, res) => {
	var name = req.params.name;
	Poll.remove({name: req.params.name}, function(err){
		if(err) throw err;
		res.redirect('/');
	})
});

app.patch('/api/addvote/', (req, res) => {
	var option = req.body.option;
	var fil = (opt) => opt.name == req.body.option;
	Poll.findOneAndUpdate(
    {name: req.body.name, 'options.name': req.body.option}, 
    {$inc: {
        'options.$.votes': 1       
    }},
    {new: true},
    function(err, d) {
    	console.log(d);
    	res.end(JSON.stringify(d));
    }
	);
});

app.patch('/api/addoption/', (req, res) => {
	var option = req.body.option;
	var id = objectId(req.body.id);
	Poll.findOne({_id: id}, function (err, poll) {
		poll.options = poll.options.concat({'name': option, 'votes': 0})
		poll.save(function (err, poll) {
			if(err) throw err;
			res.end(JSON.stringify(poll));
    });
	});
});

app.post('/api/newpoll', (req, res) => {
	var name = req.body.name;
	var options = req.body.option.filter(opt => opt !== '').map(opt => {return {name: opt, votes: 0}});
	Poll.create({name: name, options: options}, function(err, poll){
		if(err) throw err;
		res.redirect(client + '/poll/' + encodeURIComponent(poll.name));
	})
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.listen(port);