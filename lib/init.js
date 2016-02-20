
var mkdirp = require("mkdirp");
var colors = require("colors/safe");
var fs = require("fs");
var async = require("async");
var walk = require("walk");
var path = require("path");
var ignore = require("ignore");
var ejs = require("ejs");
var _ = require("lodash");


var logger = function () {
	console.log("[TD] [INIT]");
}

var checkAndCreateDirectory = function () {

};


/**
 * @callback   filesCallback
 * @param      {Error}     error         Error message.
 * @param      {Object[]}  files         Object with list files.
 * @param      {string}    files.src     Path origin the file.
 * @param      {string}    files.dest    Path destination the file.
 * @param      {string}    files.source  Content the file.
 */

/**
 * Scan Directories to genetare a project.
 *
 * @method     scanDirectories
 * @param      {string}         pathOrigin       Root directorie.
 * @param      {string}         pathDestination  Path to generate destination.
 * @param      {string[]}       pathsIgnore      Params to ignore paths.
 * @param      {filesCallback}  cb               Callback function.
 */
var scanDirectories = function (pathOrigin, pathDestination, pathsIgnore, cb) {
	var dirLoad = path.normalize(pathOrigin);
	var pathOriginToReplace = new RegExp(
		"^(" + 
		path
			.normalize(pathOrigin + "/")
			.replace(/([^a-z])/ig, "\\$1") +
		")"
	);
	var memFiles = [];
	var walker = walk.walk(pathOrigin, {followLinks: false});

	walker.on("file", function ($root, file, next) {
		var filePath = path.normalize($root + "/" + file.name);
		var localPath = filePath.replace(pathOriginToReplace, "");

		memFiles.push( localPath );
		next();
	});

	walker.on("end", function () {
		var ig = ignore().addPattern(pathsIgnore.map(path.normalize));
		var e = memFiles.filter(ig.createFilter());
		var files = e.map(function (f) {
			var src = path.normalize(pathOrigin + "/" + f);
			var dest = path.normalize(pathDestination + "/" + f);

			return {
				src: src,
				dest: dest,
				source: fs.readFileSync(src, 'utf-8'),
			};
		}); 
		cb(null, files);
	});
}

/**
 * @class
 * @param      {Object}  params                      Content parameters by td.js.
 * @param      {string}  [params.dir=process.cwd()]  Directory from the project.
 */
var InitializeAProject = function (params) {
	var files = [];
	var pathOrigin = "C:/Users/Jonathan/Documents/td.js-myApp";
	var pathDestination = ( !params.dir ) ? process.cwd() : params.dir;
	var pathsIgnore = [
		".git/*",
	];

	console.log( pathDestination );

	async
		.series([
			function (cb) {
				scanDirectories(pathOrigin, pathDestination, pathsIgnore, function (err, getFiles) {
					if (err) { cb(err); }
					else { files = getFiles; cb(null, getFiles); }
				});
			},
			function (cb) {
				cb(null, 1);
			},
		], function () {
			console.log("---end---");
		});

}


module.exports = InitializeAProject;