var path = require("path");
var fs = require("fs");

describe("CORE: parserParams", function() {
	var parserParams;
	var resultParse;
	var toParse = ["--no-value", "--name=carton", "--cc", "2ss", "e", "--ce=33"];
	var toOptions = {
		"no-value": {
			"default": true,
			"autovalue": true,
		},
		"name": {
		},
		"command": {
			"default": "c",
			"alias": ["c"],
		},
	};
	it("importando core", function() {
		parserParams = require(path.normalize(__dirname + "/../lib/core/parserParams.js"));

		expect(typeof(parserParams)).toEqual("function");
	});

	it("convirtiendo parguments", function() {
		resultParse = parserParams(toOptions, toParse);
		console.log();
		console.log(resultParse);
		console.log();
	});
	describe("parámetros transformados", function() {
		it("resultado no es de tipo objeto", function() {
			expect(typeof(resultParse)).toBe("object");
		});
		it("están definido el argumento 'options' y 'arguments'", function() {
			expect(resultParse.options).toBeDefined();
			expect(resultParse.arguments).toBeDefined();
		});
		it("el tipo de los parámetros 'arguments' es un arreglo y 'options' es objeto", function() {
			expect(typeof(resultParse.options)).toBe("object");
			expect(Array.isArray(resultParse.arguments)).toBeTruthy();
		});
	});
});
