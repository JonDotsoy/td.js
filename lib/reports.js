module.exports = {
	version: function (version) { console.log( '[td] ' + (version || '0.0.0') ); },
	starting: function (script) { console.log('[td] starting `' + script + '`'); },
}