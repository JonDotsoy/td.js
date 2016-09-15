require('babel-core/register');
require("babel-polyfill");

var path = require("path");

/**
 * Export a function to load a local commnader script.
 *
 * @method     exports
 * @param      {Object}  OPTS      - Conent parameters globals.
 * @param      {Object}  OPTS.pkg  - Conentent the `package.json`. 
 * @param      {string}  OPTS.pkg.version  - Version from td.js. 
 */
module.exports = function(OPTS, ARGS) {
	/**
	 * Resolve path to load file.
	 *
	 * @type       {string}
	 */
	var fileExecScript = path.resolve(
		OPTS.dir,
		OPTS.runScript
	);

	var args = ARGS;

	var nameCommandFile = args.shift().toString().toLowerCase();
	/**
	 * Arguments to command script.
	 *
	 * @type       {Array}
	 */
	var argsSend = [];
	var options = {};

	while (args.length) {
		var arg = args.shift();
		var option;
		var argument;

		if (
			(option = arg.match(/^\-\-([a-z|\-|\_]+)$/)) ||
			(option = arg.match(/^\-([a-z|\-|\_])$/))
		) {
			options[option[1]] = args.shift();
		} else

		if (
			argument = arg.match(/^(.+)$/)
		) {
			argsSend.push(argument[1].toString().toLowerCase());
		}
	}

	var commandScript = require(
		path.resolve(
			OPTS.dir,
			"app/commands/" + nameCommandFile + "Command"
		)
	);

	commandScript(
		argsSend,
		options
	);
}
