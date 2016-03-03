var path = require("path");
var nodemon = require("nodemon");
var reports = require(path.resolve(__dirname, "reports"));


module.exports = function(parms) {
	var fileExecScript = path.resolve(parms.dir, parms.runScript);

	nodemon({
		script: fileExecScript,
		ext: "js json",
	});

	nodemon.on('start', function() {
		reports.version(parms.pkg.version);
		console.log('[td] to restart at any time, enter `rs`');
		console.log('[td] watching: *.*');
		reports.starting(fileExecScript);
	}).on('quit', function(e) {
		console.log('App has quit');
	}).on('restart', function(files) {
		if (files) {
			console.log('App restarted due to:', files);
		} else {
			console.log('App restarted.');
		}
	});
}
