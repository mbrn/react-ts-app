const fs = require('fs-extra');
const path = require('path');

const targetFolder = process.argv[2];

const filesToCopy = ['.babelrc', 'index.tsx', 'tsconfig.json'];

const writeAppFiles = () => {
  for (const file of filesToCopy) {
    fs.createReadStream(path.join(__dirname, `../../${file}`)).pipe(
      fs.createWriteStream(`${targetFolder}/${file}`)
    );
  }

  fs.writeFile(`${targetFolder}/.gitignore`, 'node_modules', () => {});
};

module.exports = writeAppFiles;
