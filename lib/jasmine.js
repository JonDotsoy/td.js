require('babel-core/register');
require("babel-polyfill");
var jasmine = require("jasmine-node");


module.exports = function(params) {

	// The following line keeps the jasmine setTimeout in the proper scope
	jasmine.setTimeout = jasmine.getGlobal().setTimeout;
	jasmine.setInterval = jasmine.getGlobal().setInterval;

	for (var key in jasmine)
		global[key] = jasmine[key];

	var specFolders = [
		"spec"
	];
	var watchFolders = [
		"spec"
	];

	var isVerbose = false;
	var showColors = true;

	var teamcity = process.env.TEAMCITY_PROJECT_NAME || false;
	var useRequireJs = false;
	var extensions = "js";
	var match = '.';
	var matchall = false;
	var autotest = false;
	var useHelpers = true;
	var forceExit = false;
	var captureExceptions = false;
	var includeStackTrace = true;
	var growl = false;


	var onComplete = function(runner, log) {
		process.stdout.write('\n');
		if (runner.results().failedCount == 0) {
			exitCode = 0;
		} else {
			exitCode = 1;
		}
		if (forceExit) {
			process.exit(exitCode);
		}
	};

	var junitreport = {
		report: false,
		savePath: "./reports/",
		useDotNotation: true,
		consolidate: true
	}


	try {
		var regExpSpec = new RegExp(match + (matchall ? "" : "spec\\.") + "(" + extensions + ")$", 'i')
	} catch (error) {
		console.error("Failed to build spec-matching regex: " + error);
		process.exit(2);
	}

	var options = {
		specFolders: specFolders,
		onComplete: onComplete,
		isVerbose: isVerbose,
		showColors: showColors,
		teamcity: teamcity,
		useRequireJs: useRequireJs,
		regExpSpec: regExpSpec,
		junitreport: junitreport,
		includeStackTrace: includeStackTrace,
		growl: growl
	}


	jasmine.executeSpecsInFolder(options);

}
