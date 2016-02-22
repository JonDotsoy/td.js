
var path = require("path");
var reports = require(path.resolve(__dirname, "reports"));

module.exports = function (parms) {
	var fileExecScript = path.resolve(parms.dir, parms.runScript);

	reports.version(parms.pkg.version);
	reports.starting(fileExecScript);

	require( fileExecScript );
}
