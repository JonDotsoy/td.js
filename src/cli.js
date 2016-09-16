import colors from 'colors/safe'

// var colors = require("colors/safe")
var Config = require("./core/config_load")("TD")
var path = require("path")
var pkg = require(path.normalize(__dirname + "/../package.json"))
var reports = require(path.normalize(__dirname + "/reports"))
var parserParams = require(path.normalize(__dirname + "/core/parserParams"))
var _ = require("lodash")
var cwd = process.cwd()


console.log(3)

// Get Arguments
var args = process.argv.slice(2)


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
}, args)


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


var OPTS = _.merge(defaultConfigToComnand, cunstomiseConfigToCommand.options)
var ARGS = cunstomiseConfigToCommand.arguments


var commandWatch = function() {
	require(__dirname + "/nodemon")(OPTS, ARGS)
}

var commandLive = function() {
	require(__dirname + "/live")(OPTS, ARGS)
}

var commandCommand = function() {
	require(__dirname + "/commander")(OPTS, ARGS)
}

var commandInit = function() {
	require(__dirname + "/init")(OPTS, ARGS)
}

var commandTest = function() {
	require(__dirname + "/jasmine")(OPTS, ARGS)
}

var commandVersion = function() {
	var ver = _.get(OPTS, "pkg.version", '0.0.0')
	if (OPTS.quiet === true) {
		console.log(ver)
	} else {
		console.log(ver + " (td.js " + ver + ")")
	}
}

var commandHelp = function() {
	var sizeBeforeDescription = 20

	var ln = function(str) {
		return str + "\n"
	}

	var tn = function(str) {
		return "\t" + ln(str)
	}

	var ver = _.get(OPTS, "pkg.version", '0.0.0')

	var jsonOutHelp = {
		usage: "td [options] COMMAND [arguments]",
		version: ver,
		options: {
			script: {
				alias: ["s"],
				description: "Configure script file to running."
			},
			dir: {
				alias: ["d"],
				description: "Define the directory."
			},
			help: {
				alias: ["h"],
				description: "Show help."
			},
			version: {
				alias: ["v"],
				description: "Print the version."
			},
			verbose: {
				alias: ["V"],
				description: "Displays details about the execution."
			},
			quiet: {
				alias: ["q"],
				description: ""
			}
		},
		commands: {
			init: {
				alias: [],
				description: "Initialize a project."
			},
			live:{
				alias: ["l"],
				description: "Run the application."
			},
			watch: {
				alias: "w",
				description: "Run the application, restarting after any change."
			},
			test:{
				alias: "t",
				description: "Run application tests."
			},
			command: {
				alias: "c",
				description: "Run a custom command."
			},
			help: {
				alias: ["h"],
				description: "Show help."
			}
		}
	}

	var outHelp = ln('')

	_.forEach(jsonOutHelp, function (value, indexVal) {

		if (_.isObject(value)) {
			outHelp += ln(_.capitalize(indexVal) + ':')

			if (indexVal === 'options') {
				_.forEach(value, function (valueOption, nameOption){
					var description = _.get(valueOption, "description", "")
					var nameAction = _.map(_.concat([nameOption], _.get(valueOption,"alias", [])), function (optionStr) {
						if (_.size(optionStr) !== 1) {
							return '--' + optionStr
						} else {
							return '-' + optionStr
						}
					})
					var nameActionJoin = _.join(nameAction, ", ")

					outHelp += tn(nameActionJoin + _.repeat(" ", sizeBeforeDescription - _.size(nameActionJoin)) + description)
				})
			} else if (indexVal === 'commands') {
				_.forEach(value, function (valueOption, nameOption){
					var description = _.get(valueOption, "description", "")
					var nameAction = _.map(_.concat([nameOption], _.get(valueOption,"alias", [])), function (optionStr) {
						if (_.size(optionStr) !== 1) {
							return optionStr
						} else {
							return optionStr
						}
					})
					var nameActionJoin = _.join(nameAction, ", ")

					outHelp += tn(nameActionJoin + _.repeat(" ", sizeBeforeDescription - _.size(nameActionJoin)) + description)
				})
			}

			outHelp += ln('')

		} else if (_.isString(value)) {
			outHelp += ln(_.capitalize(indexVal) +': '+ value) + ln('')
		}

	})

	if (OPTS.quiet === true) {
		console.log(JSON.stringify(jsonOutHelp, null, 4))
	} else {
		console.log(outHelp)
	}
}



/*
 * Execution
 */
if (OPTS.help === true) {
	commandHelp()
} else if (OPTS.version === true) {
	commandVersion()
} else {
	var action

	switch (action = String(ARGS.shift()).toLowerCase()) {
		case 'w':
		case 'watch':
			commandWatch()
			break
		case 'l':
		case 'live':
			commandLive()
			break
		case 'c':
		case 'command':
			commandCommand()
			break
		case 'init':
			// commandInit()
			break
		case 't':
		case 'test':
			commandTest()
			break
		default:
			commandHelp()
			break
	}

}
