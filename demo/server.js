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


var root = __dirname + '/..';
var express = require('express');
var app = express();
app.use('/node_modules', express.static(root + '/node_modules'));

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

app.get('/app.js', function(req, res) {
	res.sendFile('app.js', {root: root + '/demo'});
});

app.get('/history.json', function(req, res) {
	res.sendFile('history.json', {root: root + '/demo'});
});

app.get('/dist/angular-ui-history.js', function(req, res) {
	res.sendFile('angular-ui-history.js', {root: root + '/dist'});
});

app.get('/dist/angular-ui-history.css', function(req, res) {
	res.sendFile('angular-ui-history.css', {root: root + '/dist'});
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Something broke!').end();
});

var port = process.env.PORT || process.env.VMC_APP_PORT || 8080;
var server = app.listen(port, function() {
	console.log('Web interface listening on port', port);
});
