#!/usr/bin/env node
/**
* Extremely simple static website serving script
* This is provided in case you need to deploy a quick demo
*
* Install + run:
*
* 		# from parent directory
*
*		cd demo
*		npm install
*		node server
*
*/

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

var root = __dirname + '/..';
var app = express();
app.use(bodyParser.json());
app.use('/node_modules', express.static(root + '/node_modules'));

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

app.get('/app.js', function(req, res) {
	res.sendFile('app.js', {root: root + '/demo'});
});

app.get('/dist/angular-ui-history.js', function(req, res) {
	res.sendFile('angular-ui-history.js', {root: root + '/dist'});
});

app.get('/dist/angular-ui-history.css', function(req, res) {
	res.sendFile('angular-ui-history.css', {root: root + '/dist'});
});

// Fake server to originally serve history.json + then mutate it with incomming posts
var history = JSON.parse(fs.readFileSync('./demo/history.json', 'utf-8')).map(post => {
	post.date = new Date(post.date);
	return post;
});

app.get('/history.json', function(req, res) {
	res.send(history);
});

app.post('/history.json', function(req, res) {
	history.push({
		_id: history.length,
		date: new Date(),
		user: {
			name: 'Fake User',
			email: 'fake@mfdc.biz',
		},
		type: 'user.comment',
		body: req.body.body,
	});
	res.status(200).end();
});


app.use(function(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Something broke!').end();
});

var port = process.env.PORT || process.env.VMC_APP_PORT || 8080;
var server = app.listen(port, function() {
	console.log('Web interface listening on port', port);
});
