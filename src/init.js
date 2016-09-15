var mkdirp = require("mkdirp");
var colors = require("colors/safe");
var fs = require("fs");
var async = require("async");
var walk = require("walk");
var path = require("path");
var ignore = require("ignore");
var ejs = require("ejs");
var _ = require("lodash");
var Translator = require("./translator");


var logger = function() {
	console.log.apply(console, _.concat(["[TD] [INIT]"], arguments));
}


var loadTranslator = function(directory) {
	return new Translator({ directory: directory });

}

/**
 * Used to confirm whether or not rendered.
 * 
 * @callback   conditionalCallback
 * @param      {?boolean}           [permit=true]  It defines whether to proceed with rendering.
 */

/**
 * Used to modify the rendering of the file.
 * 
 * @callback   fnRender
 * @param      {Object}              file          Data file to render.
 * @param      {string}              files.dest    Path destination the file.
 * @param      {string}              files.src     Path origin the file.
 * @param      {string}              files.local   Path local the file.
 * @param      {string}              files.source  Content the file.
 * @param      {Object}              data          Data Collection to render.
 * @param      {string}              data.dest     Path destination the file.
 * @param      {string}              data.src      Path origin the file.
 * @param      {string}              data.local    Path local the file.
 * @param      {conditionalCallback} cb	           Used to confirm whether or not rendered.
 */

/**
 * returns all files rendered.
 *
 * @callback   renderedFilesCallback
 * @param      {?Error}    err                   Show a error.
 * @param      {Object[]}  renderedFiles         Content all files rendered.
 * @param      {string}    renderedFiles.src
 * @param      {string}    renderedFiles.dest    Path of the destination.
 * @param      {string}    renderedFiles.local
 * @param      {string}    renderedFiles.source  Content rendered.
 */

/**
 * transform a EJS collection.
 *
 * @method     transformEjsCollection
 * @param      {object[]}               files         Collection of files.
 * @param      {string}                 files.dest    Path destination the file.
 * @param      {string}                 files.src     Path origin the file.
 * @param      {string}                 files.source  Content the file.
 * @param      {fnRender}               preRender     Used to modify the rendering of the file.
 * @param      {Object}                 data          Data Collection to render.
 * @param      {renderedFilesCallback}  cb            Callback function.
 */
var transformEjsCollection = function(files, preRender, data, cb) {
	async.map(files, function(file, cbByMap) {

		preRender(
			file,
			_.merge(
				data, {
					src: file.src,
					dest: file.dest,
					local: file.local,
				}
			),
			function(permit) {
				if (permit == undefined) permit = true;
				if (permit) {
					cbByMap(null, {
						src: file.src,
						dest: file.dest,
						local: file.local,
						source: ejs.render(file.source, data, {}),
					});
				} else {
					cbByMap(null, null);
				}
			}
		);

	}, function(err, f) {
		cb(err, f.filter(function(e) {
			return e !== null;
		}));
	});
}


/**
 * @callback   filesWritesCallback
 * @param      {Error}   err     { description }
 * @param      {string[]}  <name>  { description }
 */

/**
 * { function_description }
 *
 * @method     writeFileByCollect
 * @param      {Object[]}  files        Collection of the files
 * @param      {string}    files.dest   Path of destination.
 * @param      {string}    files.src    
 * @param      {string}    files.local  
 * @param      {string}    foles.source Content to write.
 * @param      {function}  preWrite
 * @param      {functio} <name> { description }
 */
var writeFileByCollect = function(files, preWrite, cb) {
	async.map(
		files,
		function(file, cbByMap) {
			preWrite(
				file,
				function(newSource) {
					// If false ignores the script file.
					if (newSource === false) {
						cbByMap(null, null);
					} else {
						if (newSource === undefined || newSource === null) newSource = file.source;

						console.log("Writing '" + file.local + "'.");

						async
						.series([
							// Generate Directy
							function(cbBySeries) {
								mkdirp(path.dirname(file.dest), function(err) {
									if (err) {
										cbBySeries(err)
									} else {
										cbBySeries();
									}
								});
							},
							// Write files.
							function(cbBySeries) {
								fs.writeFile(file.dest, newSource, function(err) {
									if (err) {
										cbBySeries(err);
									} else {
										console.log("Written '" + file.local + "' file.");
										cbBySeries(null, file.local);
									}
								});
							},
						], function(err, r) {
							if (err) {
								cbByMap(err);
							} else {
								cbByMap(null, file.dest);
							}
						});
					}
				}
			);
		},
		function(err, filesWrites) {
			cb(err, filesWrites.map(function(e) {
				return e !== null;
			}));
		}
	);
}


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
 * @method     scanDirectorieGetFiles
 * @param      {string}         pathOrigin       Root directorie.
 * @param      {string}         pathDestination  Path to generate destination.
 * @param      {string[]}       pathsIgnore      Params to ignore paths.
 * @param      {filesCallback}  cb               Callback function.
 */
var scanDirectorieGetFiles = function(pathOrigin, pathDestination, pathsIgnore, cb) {
	var dirLoad = path.normalize(pathOrigin);
	var pathOriginToReplace = new RegExp(
		"^(" +
		path
		.normalize(pathOrigin + "/")
		.replace(/([^a-z])/ig, "\\$1") +
		")"
	);
	var memFiles = [];
	var walker = walk.walk(pathOrigin, { followLinks: false });

	walker.on("file", function($root, file, next) {
		var filePath = path.normalize($root + "/" + file.name);
		var localPath = filePath.replace(pathOriginToReplace, "");

		memFiles.push(localPath);
		next();
	});

	walker.on("end", function() {
		var ig = ignore().addPattern(pathsIgnore.map(path.normalize));
		var e = memFiles.filter(ig.createFilter());
		var files = e.map(function(f) {
			var src = path.normalize(pathOrigin + "/" + f);
			var dest = path.normalize(pathDestination + "/" + f);

			return {
				src: src,
				dest: dest,
				local: path.normalize(f),
				source: fs.readFileSync(src, 'utf-8'),
			};
		});
		cb(null, files);
	});
}

/**
 * Create a project based by a resource model. 
 *
 * @param      {Object}  OPTS                      Content parameters by td.js.
 * @param      {string}  [OPTS.dir=process.cwd()]  Project directory.
 * @param      {string[]} ARGS Arguments
 */
var InitializeAProject = function(OPTS, ARGS) {
	var dataParameters = {
		parameters: {},
		arguments: [],
	};

	while (ARGS.length !== 0) {
		var index = ARGS.shift();
		var e;
		if (e = index.match(/^\-{2}([^=]+)$/)) {
			dataParameters.parameters[e[1]] = ARGS.shift() || true;
		} else
		if (e = index.match(/^\-{2}([^=]+)=(.+)$/)) {
			dataParameters.parameters[e[1]] = e[2];
		} else
		if (e = index.match(/^(.+)$/)) {
			dataParameters.arguments.push(e[1]);
		}
	}


	var files = [];
	var filesToWrite = [];
	var tdInitializeFile = "td.js";
	var pathOrigin = "C:/Users/Jonathan/Documents/td.js-myApp";
	var pathDestination = (!OPTS.dir) ? process.cwd() : OPTS.dir;
	var tdInitializeControl = {
		initialize: function(a, b, cb) { cb() },
		render: function(a, b, cb) { cb() },
		write: function(file, cb) { cb() },
	};
	var pathsIgnore = [
		"td.js",
		".git/*",
	];
	var translator = null;


	async
	.series([
		// Initialize With Td.JS files.
		function(cb) {
			var pathFileInitislize = null;
			fs.stat(
				pathFileInitislize = path.normalize(pathOrigin + "/" + tdInitializeFile),
				function(err, statFile) {
					if (err) { cb(); } else {
						tdInitializeControl = _.merge(tdInitializeControl, require(pathFileInitislize));

						tdInitializeControl.initialize(
							dataParameters,
							function(name, value) {
								switch (name) {
									case 'ignore':
										pathsIgnore.push(value);
										break;
									case 'parameters':
										if (_.isObject(value)) {
											dataParameters.parameters = _.merge(dataParameters.parameters, value);
										}
										break;
									case 'arguments':
										if (_.isArray(value)) {
											_.map(value, function(v) {
												dataParameters.arguments.push(v);
											});
										}
										break;
									default:
										return false;
										break;
								}
								return true;
							},
							cb
						);
					}
				}
			);
		},
		// Load translator
		function(cb) {
			translator = loadTranslator(pathDestination);
			cb();
		},
		// Scan Directories to loead files.
		function(cb) {
			scanDirectorieGetFiles(
				pathOrigin,
				pathDestination,
				pathsIgnore,
				function(err, getFiles) {
					if (err) { cb(err); } else {
						files = getFiles;
						cb(null, getFiles);
					}
				}
			);
		},
		// Render File.
		function(cb) {
			transformEjsCollection(
				files,
				tdInitializeControl.render, {
					package: _.get.bind(_, OPTS.pkg),
					_: _,
					async: async,
					parameters: _.get.bind(_, dataParameters.parameters),
					arguments: dataParameters.arguments,
					__: translator.__,
				},
				function(err, _filesToWrite) {
					cb(err, filesToWrite = _filesToWrite);
				}
			);
		},
		// Write Files.
		function(cb) {
			writeFileByCollect(
				filesToWrite,
				tdInitializeControl.write,
				function(err, filesWrites) {
					cb(err, filesWrites);
				}
			);
		},
	], function(err, r) {
		if (err) {
			throw err;
		} else {
			// console.log( r );
			// console.log( "-[end]-" );
		}
	});

}


module.exports = InitializeAProject;
