
module.exports = function (parms) {
	console.log('[td] ' + (parms.pkg.version || '0.0.0') );
	console.log('[td] starting `' + parms.runScript + '`');

	require(process.cwd() + "/" + parms.runScript);
}
