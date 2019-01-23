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

const DEFAULT_HELP_OUTPUT = `Usage: cli [command]

Options:
  -V, --version  Show version number                       [boolean]
  -h, --help     Show help text                            [boolean]
`;

const CUSTOM_HELP_OUTPUT = `Usage: cli [command]

Options:
  -V, --version    Show version number                       [boolean]
  -u, --url <url>  Specify a URL for the HTTP request        [string]
  -v, --verbose    Show additional information               [boolean]
  -h, --help       Show help text                            [boolean]
`;

module.exports = {
  execAsync,
  DEFAULT_HELP_OUTPUT,
  CUSTOM_HELP_OUTPUT
};
