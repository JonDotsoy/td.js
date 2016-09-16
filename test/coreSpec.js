import expect from 'expect'
import fs from 'fs'
import path from 'path'

describe("CORE: parserParams", () => {
	// let parserParams
	// let resultParse
	// let toParse = ["--no-value", "--name=carton", "-c", "2ss", "e", "--ce=33"]
	// let toOptions = {
	// 	"no-value": {
	// 		"default": true,
	// 		"autovalue": true,
	// 	},
	// 	"name": {
	// 		"default": "",
	// 	},
	// 	"command": {
	// 		"default": "c",
	// 		"alias": ["c"],
	// 	},
	// }

	// it("importando core", function() {
	// 	parserParams = require(path.normalize(__dirname + "/../lib/core/parserParams.js"))

	// 	expect(typeof(parserParams)).toEqual("function")
	// })

	// it("convirtiendo parguments", function() {
	// 	resultParse = parserParams(toOptions, toParse)
	// })

	// describe("parámetros transformados", function() {
	// 	it("resultado no es de tipo objeto", function() {
	// 		expect(typeof(resultParse)).toBe("object")
	// 	})
	// 	it("están definido el argumento 'options' y 'arguments'", function() {
	// 		expect(resultParse.options).toBeDefined()
	// 		expect(resultParse.arguments).toBeDefined()
	// 	})
	// 	it("el tipo de los parámetros 'arguments' es un arreglo y 'options' es objeto", function() {
	// 		expect(typeof(resultParse.options)).toBe("object")
	// 		expect(Array.isArray(resultParse.arguments)).toBeTruthy()
	// 	})
	// })

	// describe("valores esperados", function() {
		
	// 	it("'arguments'", function() {
			
	// 		expect(resultParse.options["no-value"]).toEqual(true)
	// 		expect(resultParse.options.name).toBe("carton")
	// 		expect(resultParse.options.command).toBe("2ss")

	// 	})

	// 	it("'options'", function() {

	// 		expect(resultParse.arguments).toContain("e")
	// 		expect(resultParse.arguments).toContain("--ce=33")

	// 	})

	// })
})
