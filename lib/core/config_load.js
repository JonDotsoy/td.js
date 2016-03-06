var _ = require("lodash");
var fs = require("fs");
var path = require("path");


var pathTdLocalConfig = process.cwd() + "/" + _.get(process, "env.TD_FILE_CONFIG", "td.json");
var localConfig = {};


try {
	fs.statSync(pathTdLocalConfig);
	var _content_file_config = require(pathTdLocalConfig);
	localConfig = _.merge(localConfig, _content_file_config);
} catch (err) {}


var findInEnvironment = function(prefix_find, toFind) {
	var newToFind = toFind.replace(/\.+/g, "_");
	var nameFind;

	if (Boolean(prefix_find)) {
		nameFind = String(prefix_find).toUpperCase() + "_" + String(newToFind).toUpperCase();
	} else {
		nameFind = String(newToFind).toUpperCase();
	}

	var e = _.get(process, "env." + nameFind, false);
	return e;
};

var findInLocalConfig = function(toFind) {
	var e = _.get(localConfig, String(toFind).toLowerCase(), false);

	return e;
};

var GlobalConfig = function(prefix_find, toFind, defaultValue) {
	var ENVVAR = findInEnvironment(prefix_find, toFind);
	var LOCALVAR = findInLocalConfig(toFind);

	if (LOCALVAR !== false) {
		return LOCALVAR;
	} else if (ENVVAR !== false) {
		return ENVVAR;
	} else {
		return defaultValue;
	}
};


module.exports = _.curry(GlobalConfig);
