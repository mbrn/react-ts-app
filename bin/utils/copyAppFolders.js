const fs = require('fs-extra');
const path = require('path');

const targetFolder = process.argv[2];

const foldersToCopy = ['configs', 'public', 'src'];

const copyAppFolders = () => {
  for (const folder of foldersToCopy) {
    fs.copy(
      path.join(__dirname, `../../${folder}`),
      `${targetFolder}/${folder}`
    )
      .then(() =>
        console.log(`${folder} copied to ${targetFolder} folder`)
      )
      .catch(err => console.error(err));
  }
};

module.exports = copyAppFolders;
