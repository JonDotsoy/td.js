
var i18n = require("i18n");
var path = require("path");
var _ = require("lodash");


/**
 * It allows you to load a component for translation of plain text.
 * 
 * @class      generateAcomponentTranslate generateAcomponentTranslate
 * @param      {Object}  [configs] - It contains the settings for this translator.
 * @param      {string[]}  [configs.locales=['en']] - Other locales default to en silently.
 * @param      {string}  [configs.defaultLocale='en'] - Default locales.
 */
var generateAcomponentTranslate = function () {
	var configs = _.get(arguments, '0', {});

	var locales = _.get(configs, 'locales', ['en']);
	var defaultLocale = _.get(configs, 'defaultLocale', 'en');
	var defaultLocale = _.get(configs, 'defaultLocale', 'en');
	var directory = _.get(configs, 'directory', undefined);


	i18n.configure({
		locales: locales,
		defaultLocale: defaultLocale,
		defaultLocale: defaultLocale,
		directory: directory,
	});

	this.translator = i18n;
};

/**
 * translated text.
 *
 * @method     __
 * @param      {string}  strTranslate	- Translate a functioaneli
 */
generateAcomponentTranslate.prototype.__ = function() {
	return this.translator.__.apply(this.translator, arguments);
};


module.exports  = generateAcomponentTranslate;
