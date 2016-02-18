
require('babel-core/register');
require("babel-polyfill");

var path = require("path");

module.exports = function (params) {
	var fileExecScript = path.resolve(parms.dir, parms.runScript);

	var args = params.args;

	var nameCommandFile = args.shift().toString().toLowerCase();
	var arguments = [];
	var options = {};

	while (args.length) {
		var arg = args.shift();
		var option;
		var argument;

		if ((option = arg.match(/^\-\-([a-z|\-|\_]+)$/)) || (option = arg.match(/^\-([a-z|\-|\_])$/))) {
			options[option[1]] = args.shift();
		} else if (argument = arg.match(/^(.+)$/)) {
			arguments.push(argument[1].toString().toLowerCase());
		}
	}

	require( path.resolve(parms.dir, "app/commands/" + nameCommandFile + "Command") )(arguments, options);
}
