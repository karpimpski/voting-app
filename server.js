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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

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

var objectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;
var client;
process.argv[3] ? client = 'http://localhost:'+process.argv[3] : client = '';
var port;
process.argv[2] ? port = +process.argv[2] : port = process.env.PORT;

var Poll = require('./models/poll.js');
var User = require('./models/user.js');

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

app.get('/api/currentuser', (req, res) => {
	if(req.user){
		var user = req.user;
		user.password = null;
		var obj = {res: req.user};
	}
	else{
		obj = {res: null}
	}
	res.end(JSON.stringify(obj));
});

app.post('/api/logout', function(req, res){
  req.logout();
  res.end('logged out');
});

app.delete('/api/delete', (req, res) => {
	Poll.remove({name: req.body.name}, function(err){
		if(err) throw err;
		res.end(JSON.stringify({res: 'deleted poll'}));
	});
});

app.patch('/api/addvote/', (req, res) => {
	var option = req.body.option;
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	Poll.findOne({name: req.body.name}, function(err, poll){
		if(err) throw err;
		if(poll.voters.indexOf(ip) < 0){
			poll.options.find((opt) => opt.name == req.body.option).votes++;
			poll.voters = poll.voters.concat(ip);
			poll.markModified('options', 'voters');
			poll.save(function(err, poll){
				res.end(JSON.stringify(poll));
			})
		}
		else{
			res.end(JSON.stringify(false));
		}
	});
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
	if(!req.user){
		res.end(JSON.stringify(false));
	}
	var name = req.body.name;
	var options = req.body.option.filter(opt => opt !== '').map(opt => {return {name: opt, votes: 0}});
	Poll.create({name: name, options: options, user: req.user._id, author: req.user.username}, function(err, poll){
		if(err) throw err;
		User.findByIdAndUpdate(req.user._id, {$push: {"polls": poll._id } }, function(err, result){
        if(err) throw err;
    });
		res.redirect(client + '/poll/' + encodeURIComponent(poll.name));
	})
});

app.post('/api/register', function(req, res){
  User.find({username: req.body.username}, function(err, users){
    if(err) throw err;
    if(users.length == 0){
      var user = new User({ username: req.body.username, password: req.body.password });
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          req.login(user, function(err){
            if(err) throw err;
            res.redirect('/');
          });
        }
      });
    }
    else{
      res.redirect('/register');
    }
  });
});

app.post('/api/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'}));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.listen(port);