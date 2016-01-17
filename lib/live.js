
var path = require("path");
var reports = require(path.resolve(__dirname, "reports"));

module.exports = function (parms) {
	reports.version(parms.pkg.version);
	reports.starting(parms.runScript);

	require(path.resolve(process.cwd(), parms.runScript));
}
