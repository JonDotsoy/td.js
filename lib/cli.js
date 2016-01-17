
var path = require("path");
var pkg = require(path.resolve(__dirname, "../package.json"));
var reports = require(path.resolve(__dirname, "reports"));

var args = process.argv.slice(2);
var parms = {
	pkg: pkg,
	runScript: "bootstrap/register.js",
};

var exec = false;

if (args.length == 0) {
	args = ["live"];
}

while (args.length) {
  	var arg = args.shift();

	switch (arg) {
		case "-h":
		case "--help":
		case "h":
		case "help":
			help();
			process.exit(0);

		case "-v":
		case "--version":
			if (exec == false) {
				console.log("Version " + (pkg.version || '0.0.0'));
				process.exit(0);
			}
			break;

		case "-s":
		case "--script":
			if (exec == false) {
				parms.runScript = args.shift();
			}
			break;

		case "t":
		case "test":
			if (exec == false) {
				require(__dirname + "/jasmine")(parms);
			}
			exec = true;
			break;

		case "w":
		case "watch":
			if (exec == false) {
				require(__dirname + "/nodemon")(parms);
			}
			exec = true;
			break;

		case "l":
		case "live":
			if (exec == false) {
				require(__dirname + "/live")(parms);
			}
			exec = true;
			break;
	}

}

function help () {
	console.log(''
		+        'Usage: td [options] COMMAND'
		+ "\n" + ''
		+ "\n" + 'Version: ' + (pkg.version||"0.0.0")
		+ "\n" + ''
		+ "\n" + 'Options:'
		+ "\n" + '\t--script, -s     Configure script file to running.'
		+ "\n" + '\t--help, -h       Show help.'
		+ "\n" + '\t--version, -v    Print the version.'
		+ "\n" + ''
		+ "\n" + 'Commands:'
		+ "\n" + '\tlive, l          Run the application.'
		+ "\n" + '\twatch, w         Run the application, restarting after any change.'
		+ "\n" + '\ttest, t          Run application tests.'
		+ "\n" + '\thelp, h          Show help.'
		+ "\n" + ''
	);
}