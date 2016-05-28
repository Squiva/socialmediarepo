var app = require('express')();
var http = require('http').Server(app);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var port = Number(process.env.port) || 8080;
var url = "mongodb://sqva:lvstrm@ds017193.mlab.com:17193/livestream";

var postArray = [];

var insert = function(data, db, callback) {
	db.collection('livestream').insertOne(data, function(err, result) {
		assert.equal(err, null);
		console.log("Inputed!");
		callback();
	});
}
var getPosts = function(db, callabck) {
	var cursor = db.collection('livestream').find();
	var i = 0;
	cursor.each(function(err, result) {
		assert.equal(err, null);
		if(result != null) {
			i++;
			postArray[i] = result;
			console.log(result);
		}
	});
}
MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	getPosts(db, function() {
		db.close();
	});
	console.log("Connnected!");
});
app.get('/get', function(req, res) {
	res.send(postArray);
});
app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', function(req, res) {
	res.sendFile(__dirname + '/style.css');
});
http.listen(port, function() {
	console.log("Website available at: http://localhost:8080");
});