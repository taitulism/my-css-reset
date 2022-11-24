const {createReadStream, createWriteStream, statSync} = require('fs');
const {rename, unlink} = require('fs/promises');

/*
	PrependToFile:
	1. Rename target file (add ".tmp" extension)
	2. Create a new empty file with the original name
	3. First, write the given data ("prepend")
	4. Append the content from the original (now temporary) file
	5. Delete the original/temporary file
*/
module.exports = prependToFile = (data, filePath) => (
	new Promise((resolve, reject) => {
		const tempPath = filePath + '.tmp';

		rename(filePath, tempPath).then(() => {
			const newFileStream = createWriteStream(filePath, {emitClose: false});

			newFileStream.write(data);

			createReadStream(tempPath, {emitClose: false})
				.on('end', () => {
					newFileStream.close();
					unlink(tempPath, (err) => err ? reject(err) : resolve());
				})
				.pipe(newFileStream)
			;
		});
	})
);
