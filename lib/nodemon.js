
var nodemon = require("nodemon");
var reports = require(__dirname + "/reports");


module.exports = function (parms) {
	nodemon({
		script: process.cwd() + "/" + parms.runScript,
		ext: "js json",
	});

	nodemon.on('start', function () {
		reports.version(parms.pkg.version);
		console.log('[td] to restart at any time, enter `rs`');
		console.log('[td] watching: *.*');
		reports.starting(parms.runScript);
	}).on('quit', function (e) {
		console.log('App has quit');
	}).on('restart', function (files) {
		if (files) {
			console.log('App restarted due to:', files);
		} else {
			console.log('App restarted.');
		}
	});
}
