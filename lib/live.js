var path = require("path");
var reports = require(path.resolve(__dirname, "reports"));

module.exports = function(OPTS, ARGS) {
	var fileExecScript = path.resolve(OPTS.dir, OPTS.runScript);

	reports.version(OPTS.pkg.version);
	reports.starting(fileExecScript);

	require(fileExecScript);
}
