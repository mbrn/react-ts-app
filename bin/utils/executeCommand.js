const { exec } = require('child_process');

const executeCommand = (command, id) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stdout);
    });
  });

module.exports = executeCommand;
