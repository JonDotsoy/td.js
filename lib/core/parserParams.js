var mapOptions = function(opts) {
	var keys = Object.keys(opts);

	var toOut = {};

	for (var i = 0; i < keys.length; i++) {
		var nowKey = keys[i];
		var nowValue = opts[nowKey];
		nowValue.name = nowKey;

		if (Object.keys(nowValue).indexOf("alias") != -1) {
			if (Array.isArray(nowValue.alias)) {
				for (var i = 0; i < nowValue.alias.length; i++) {
					toOut[nowValue.alias[i]] = nowValue;
				}
			}
		}

		toOut[nowKey] = nowValue;

	}

	return toOut;
}

var defineOption = function(option) {
	// Ex: -c or --var or --es=44
	if (option.match(/^\-{1,2}([^\s]+)$/) !== null) {
		var match;

		if ((match = option.match(/^\-{1}([^\s\=]{1})$/)) !== null) {
			return { name: match[1] };
		} else if ((match = option.match(/^\-{2}([^\s\=]+)$/)) !== null) {
			return { name: match[1] };
		} else if ((match = option.match(/^\-{1}([^\s\=]{1})\=(.+)$/)) !== null) {
			return { name: match[1], value: match[2] };
		} else if ((match = option.match(/^\-{2}([^\s\=]+)\=(.+)$/)) !== null) {
			return { name: match[1], value: match[2] };
		} else {
			return null;
		}

	} else {
		return null;
	}
}

/**
 * Transforma un arreglo identificando los parámetros y argumentos.
 *
 * @method     parseParams
 * @param      {object}    options    - Contiene la estructura de las opciones a mapear.
 * @param      {string[]}  parameters - Contiene los contiene los elementos a transformar.
 * @return     {{options: Object, arguments: string[]}} Retorna un objeto con los parámetros y los argumentos detectados.
 * 
 * @example
 * var com = parseParams({"text":["a","abc"],"comman":["c","command"]}, ["-a","abc", "-c", "put", "-i", "cool"])
 * 
 * console.log(com); // {options:{"text":"abc","comman":"put"},arguments:["cool"]}
 * 
 */
var parseParams = function(options, parameters) {
	var mapOps;
	var opts = {};
	var args = [];

	if (typeof(options) != "object" && options !== null) {
		throw new Error("'options' require either an array or a null value.");
	}

	if (!Array.isArray(parameters)) {
		throw new Error("Require 'parameters' is a settlement.");
	}

	mapOps = mapOptions(options);

	// Map parameters
	var currentParam = null;
	var readOptins = true;
	while ((currentParam = String(parameters.shift())) != "undefined") {
		// Validate type string
		var opt = defineOption(currentParam);
		var _o
		console.log("a");
		if (opt !== null && readOptins === true && (_o = mapOps[opt.name]) !== undefined) {

			console.log(_o);

			// if (_o.autovalue === true) {
			// 	opts[_o["name"]] === _o["default"];
			// }

		} else {
			readOptins = false;
			args.push(currentParam);
		}
	}


	return { arguments: args, options: opts };
}

exports = module.exports = parseParams;
