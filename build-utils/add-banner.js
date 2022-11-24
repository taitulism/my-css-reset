const {resolve} = require('path');
const pkgJson = require('../package.json');
const generateBanner = require('./generte-banner');
const prependToFile = require('./prepend-to-file');

const buildFilePath = process.argv[2];
const banner = generateBanner(pkgJson);

if (buildFilePath) {
	const resolvedPath = resolve(__dirname, '../', buildFilePath);

	prependToFile(banner, resolvedPath).then(() => {
		console.log('OK');
		process.exit();
	}, (err) => {
		console.error(err);
		process.exit(1);
	})
}
else {
	console.error('[ERROR] add-banner-js: file path argument required.');
	process.exit(1);
}
