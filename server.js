var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/1955API');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema ({
	name: { type: String }
})

mongoose.model('User', UserSchema);
var User = mongoose.model('User');



app.get('/', function(req, res) {
	User.find({}, function(err, users) {
		if(err){
			console.log("Returned error", err)
		} else {
			res.json({message: "Success", data: users});
		}
	})
})

app.get('/new/:name/', function(req, res) {
	console.log(req.params.name);
	var user = new User({name: req.params.name});
	user.save(function(err) {
		if(err) {
			res.json({err})
		} else {
			res.redirect('/');
		}
	})
})

app.get('/remove/:name/', function(req, res) {
	User.remove({name: req.params.name}, function(err, results) {
		if (err) {
			console.log(err)
		} else {
			res.redirect('/')
		}
	})
})

app.get('/:name', function (req, res) {
	User.find({name: req.params.name}, function (err, users) {
		if (err) {
			console.log(err)
		} else {
			res.json({data: users});
		}
	})
})



app.listen(8000, function() {
	console.log("1955 API listening on port 8000");
})