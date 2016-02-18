
var mkdirp = require("mkdirp");
var colors = require("colors/safe");
var fs = require("fs");
var async = require("async");


var logger = function () {
	console.log("[TD] [INIT]");
}

var checkAndCreateDirectory = function () {

};

var createDirectories = function (cb) {
	cb(null, 1)
}

module.exports = function (params) {

	async.series([
		createDirectories,
	], function () {
		console.log("end");
	});

}
