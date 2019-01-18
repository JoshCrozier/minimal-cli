'use strict';

const path = require('path');
const exec = require('child_process').exec;

function execAsync(argv) {
  return new Promise((resolve, reject) => {
    const fixturePath = path.resolve(__dirname, './fixture.js');

    exec(`${fixturePath} ${argv}`, (error, stdout) => {
      if (!error) {
        resolve(stdout);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = {
  execAsync
};
