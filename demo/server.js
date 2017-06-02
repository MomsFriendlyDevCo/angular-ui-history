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
var humanize = require('humanize');
var fs = require('fs');
var multer = require('multer');

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

app.post('/history.json', multer().any(), function(req, res) {
	if (req.files) { // Uploading file(s)
		history.push({
			_id: history.length,
			type: 'user.upload',
			date: new Date(),
			user: {
				name: 'Fake User',
				email: 'fake@mfdc.biz',
			},
			files: req.files.map(f => ({
				filename: f.originalname,
				size: humanize.filesize(f.size),
				icon:
					// Very abridged list of mimetypes -> font-awesome lookup {{{
					/^audio\//.test(f.mimetype) ? 'fa fa-file-audio-o' :
					/^image\//.test(f.mimetype) ? 'fa fa-file-image-o' :
					/^text\//.test(f.mimetype) ? 'fa fa-file-text-o' :
					/^video\//.test(f.mimetype) ? 'fa fa-file-video-o' :
					f.mimetype == 'application/vnd.ms-excel' || f.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || f.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' ? 'fa fa-file-excel-o' :
					f.mimetype == 'application/msword' || f.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || f.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' ? 'fa fa-file-word-o' :
					f.mimetype == 'application/vnd.ms-powerpoint' || f.mimetype == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || f.mimetype == 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' || f.mimetype == 'application/vnd.openxmlformats-officedocument.presentationml.template' ? 'fa fa-file-word-o' :
					f.mimetype == 'application/pdf' ? 'fa fa-file-pdf-o' :
					f.mimetype == 'application/zip' || f.mimetype == 'application/x-compressed-zip' || f.mimetype == 'application/x-tar' || f.mimetype == 'application/x-bzip2' ? 'fa fa-file-archive-o' :
					'fa fa-file-o',
					// }}}
			})),
		});

		// If we did want to actually save the file we would do something like:
		// req.files.forEach(f => fs.writeFile(`/some/directory/${f.originalname}`, f.buffer));
	}

	if (req.body.body) { // Posting a comment
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
	}

	// Respond that all was well
	res.status(200).end();
});


app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send('Something broke!').end();
});

var port = process.env.PORT || process.env.VMC_APP_PORT || 8080;
var server = app.listen(port, function() {
	console.log('Web interface listening on port', port);
});
