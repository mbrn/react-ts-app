#!/usr/bin/env node

const buildPackageJson = require('./utils/buildPackageJson');
const copyAppFolders = require('./utils/copyAppFolders');
const executeCommand = require('./utils/executeCommand');
const writeAppFiles = require('./utils/writeAppFiles');
const writePackageJson = require('./utils/writePackageJson');

<<<<<<< HEAD
const packageJson = require('../package.json');
const filesToCopy = ['.babelrc', 'index.tsx', 'tsconfig.json'];
const foldersToCopy = ['configs', 'public', 'src'];
=======
const targetFolder = process.argv[2];
>>>>>>> pr/9

const folderInitCommand = `mkdir ${targetFolder} && cd ${targetFolder}`;
const npmInitCommand = `cd ${targetFolder} && npm install`;

executeCommand(folderInitCommand, 'folder')
  .then(() => {
    // replace the default scripts, with the webpack scripts in package.json
    const packageJson = buildPackageJson();
    writePackageJson(packageJson);

    writeAppFiles();
    copyAppFolders();

<<<<<<< HEAD
    // Create .gitignore
    fs.writeFile(`${process.argv[2]}/.gitignore`, 'node_modules', err2 => err2 || true)

    for (let i = 0; i < filesToCopy.length; i += 1) {
      fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`))
        .pipe(fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`));
    }
    for (let i = 0; i < foldersToCopy.length; i++) {
      fs.copy(path.join(__dirname, '../' + foldersToCopy[i]), `${process.argv[2]}/${foldersToCopy[i]}`)
        .then(() => console.log(`${foldersToCopy[i]} copied ${process.argv[2]} folder`))
        .catch(err => console.error(err));
    }
  
=======
>>>>>>> pr/9
    // installing dependencies
    return executeCommand(npmInitCommand, 'npm');
  })
  .then(() => {
    console.log('Everything ok');
  })
  .catch((err) => {
    console.error(`Everything was fine, then it wasn't: ${err}`);
  });
