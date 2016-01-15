#!/bin/env node
var pkg = require("../package.json");
var nodemon = require("nodemon");

var runScript = "bootstrap/register.js";

var e = nodemon({
	script: process.cwd() + "/" + runScript,
	ext: "js json",
});

nodemon.on('start', function () {
	console.log('[td] ' + (pkg.version || '1.0.0') );
	console.log('[td] to restart at any time, enter `rs`');
	console.log('[td] watching: *.*');
	console.log('[td] starting `' + runScript + '`');
}).on('quit', function (e) {
	console.log('App has quit');
}).on('restart', function (files) {
	if (files) {
		console.log('App restarted due to:', files);
	} else {
		console.log('App restarted.');
	}
});
