var Config = require("./core/config_load")("TD");
var path = require("path");
var pkg = require(path.normalize(__dirname + "/../package.json"));
var reports = require(path.normalize(__dirname + "/reports"));
var parserParams = require(path.normalize(__dirname + "/core/parserParams"));
var _ = require("lodash");
var cwd = process.cwd();

// Get Arguments
var args = process.argv.slice(2);


var cunstomiseConfigToCommand = parserParams({
	"dir": {
		"alias": ["dirs", "d"],
	},
	"runScript": {
		"alias": ["script", "s"],
	},
	"help": {
		"default": true,
		"autovalue": true,
		"alias": ["h"],
	},
	"verbose": {
		"autovalue": true,
		"default": true,
		"alias": ["V"],
	},
	"version": {
		"autovalue": true,
		"default": true,
		"alias": ["v"]
	},
	"quiet": {
		"autovalue": true,
		"default": true,
		"alias": ["q"],
	},
}, args);


/**
 * Conent the parameters to project.
 *
 * @type       {Object}
 */
var defaultConfigToComnand = {
	runScript: Config("RUN", "bootstrap/register.js"),
	dir: cwd,
	pkg: pkg,
	help: false,
	verbose: false,
	version: false,
	quiet: false,
}


var OPTS = _.merge(defaultConfigToComnand, cunstomiseConfigToCommand.options);
var ARGS = cunstomiseConfigToCommand.arguments;


var commandWatch = function() {
	require(__dirname + "/nodemon")(OPTS, ARGS);
};

var commandLive = function() {
	require(__dirname + "/live")(OPTS, ARGS);
};

var commandCommand = function() {
	require(__dirname + "/commander")(OPTS, ARGS);
};

var commandInit = function() {
	require(__dirname + "/init")(OPTS, ARGS);
};

var commandTest = function() {
	require(__dirname + "/jasmine")(OPTS, ARGS);
};

var commandVersion = function() {
	var ver = _.get(OPTS, "pkg.version", '0.0.0');
	if (OPTS.quiet === true) {
		console.log(ver);
	} else {
		console.log(ver + " (td.js " + ver + ")");
	}
};

var commandHelp = function() {
	var outHelp = '' +
		'Usage: td [options] COMMAND' + "\n" +
		'' + "\n" +
		'Version: ' + (pkg.version || "0.0.0") + "\n" +
		'' + "\n" +
		'Options:' + "\n" +
		'\t--script, -s     Configure script file to running.' + "\n" +
		'\t--dir, -d        Define the directory.' + "\n" +
		'\t--help, -h       Show help.' + "\n" +
		'\t--version, -v    Print the version.' + "\n" +
		'\t--verbose, -V    Displays details about the execution.' + "\n" +
		'' + "\n" +
		'Commands:' + "\n" +
		'\tinit             Initialize a project.' + "\n" +
		'\tlive, l          Run the application.' + "\n" +
		'\twatch, w         Run the application, restarting after any change.' + "\n" +
		'\ttest, t          Run application tests.' + "\n" +
		'\tcommand, c       Run a custom command.' + "\n" +
		'\thelp, h          Show help.' + "\n" +
		'';

	console.log(outHelp);
};



/*
 * Execution
 */
if (OPTS.help === true) {
	commandHelp();
} else if (OPTS.version === true) {
	commandVersion();
} else {
	var action;

	switch (action = String(ARGS.shift()).toLowerCase()) {
		case 'w':
		case 'watch':
			commandWatch();
			break;
		case 'l':
		case 'live':
			commandLive();
			break;
		case 'c':
		case 'command':
			commandCommand();
			break;
		case 'init':
			commandInit();
			break;
		case 't':
		case 'test':
			commandTest();
			break;
		default:
			commandHelp();
			break;
	}

}
