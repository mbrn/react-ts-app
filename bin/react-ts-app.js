#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const packageJson = require('../package.json');
const filesToCopy = ['.babelrc', '.gitignore', 'index.tsx', 'tsconfig.json'];
const foldersToCopy = ['configs', 'public', 'src'];

const executeCommand = (command, id) =>
  new Promise((resolve) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(id, err, stdout, stderr);
        return;
      }

      resolve(stdout);
    });
  });

const folder = process.argv[2];

const folderInitCommand = `mkdir ${process.argv[2]} && cd ${process.argv[2]}`;
const npmInitCommand = `cd ${process.argv[2]} && npm install`;

const buildPackageJson = () => {
  const newPckJson = { ...packageJson };
  newPckJson.name = process.argv[2];
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

const writePackageJson = json =>
  fs.writeFile(`${folder}/package.json`, json, () => {});

executeCommand(folderInitCommand, 'folder')
  .then(() => {
    // replace the default scripts, with the webpack scripts in package.json
    const packageJson = buildPackageJson();
    writePackageJson(packageJson);

    for (let i = 0; i < filesToCopy.length; i += 1) {
      fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`)).pipe(
        fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`)
      );
    }
    for (let i = 0; i < foldersToCopy.length; i++) {
      fs.copy(
        path.join(__dirname, '../' + foldersToCopy[i]),
        `${process.argv[2]}/${foldersToCopy[i]}`
      )
        .then(() =>
          console.log(`${foldersToCopy[i]} copied ${process.argv[2]} folder`)
        )
        .catch(err => console.error(err));
    }

    // installing dependencies
    return executeCommand(npmInitCommand, 'npm');
  })
  .then(() => {
    console.log('Everything ok');
  })
  .catch((id, err) => {
    if (id === 'npm') {
      console.error(`it's always npm, ain't it? ${npmErr}`);
      return;
    }

    console.error(`Everything was fine, then it wasn't: ${initErr}`);
  });
