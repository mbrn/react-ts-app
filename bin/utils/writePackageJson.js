const fs = require('fs-extra');

const targetFolder = process.argv[2];

const writePackageJson = json =>
  fs.writeFile(`${targetFolder}/package.json`, json, () => {});

module.exports = writePackageJson;
