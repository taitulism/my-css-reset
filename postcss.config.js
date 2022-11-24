const cssNano = require('cssnano');
const cssImport = require('postcss-import');

module.exports = {
	plugins: [
		cssImport({
			from: './lib/reset.css',
		}),
		cssNano({
			preset: 'default',
		}),
	],
};
