const packageJson = require('../../package.json');

const targetFolder = process.argv[2];

const buildPackageJson = () => {
  const newPckJson = { ...packageJson };
  newPckJson.name = targetFolder;
  newPckJson.version = '1.0.0';
  delete newPckJson.homepage;
  delete newPckJson.repository;
  delete newPckJson.keywords;
  delete newPckJson.author;
  delete newPckJson.license;
  delete newPckJson.bugs;
  delete newPckJson.bin;
  delete newPckJson.dependencies['fs-extra'];
  return JSON.stringify(newPckJson, null, 2);
};

module.exports = buildPackageJson;
