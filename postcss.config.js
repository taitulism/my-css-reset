const cssNano = require('cssnano');
const cssImport = require('postcss-import');

module.exports = {
	plugins: [
		cssImport({
			from: './src/reset.css',
		}),
		cssNano({
			preset: 'default',
		}),
	],
};
