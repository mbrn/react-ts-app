#!/usr/bin/env node

const buildPackageJson = require('./utils/buildPackageJson');
const copyAppFolders = require('./utils/copyAppFolders');
const executeCommand = require('./utils/executeCommand');
const writeAppFiles = require('./utils/writeAppFiles');
const writePackageJson = require('./utils/writePackageJson');

const targetFolder = process.argv[2];

const folderInitCommand = `mkdir ${targetFolder} && cd ${targetFolder}`;
const npmInitCommand = `cd ${targetFolder} && npm install`;

executeCommand(folderInitCommand, 'folder')
  .then(() => {
    // replace the default scripts, with the webpack scripts in package.json
    const packageJson = buildPackageJson();
    writePackageJson(packageJson);

    writeAppFiles();
    copyAppFolders();

    // installing dependencies
    return executeCommand(npmInitCommand, 'npm');
  })
  .then(() => {
    console.log('Everything ok');
  })
  .catch((err) => {
    console.error(`Everything was fine, then it wasn't: ${err}`);
  });
