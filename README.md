# minimal-cli

[![npm package](https://nodei.co/npm/minimal-cli.png?downloads=true)](https://www.npmjs.com/package/minimal-cli)

[![NPM version](https://img.shields.io/npm/v/minimal-cli.svg?style=flat-square)](https://www.npmjs.com/package/minimal-cli)
[![Build status](https://img.shields.io/travis/JoshCrozier/minimal-cli.svg?style=flat-square)](https://travis-ci.org/JoshCrozier/minimal-cli)
[![Coverage](https://img.shields.io/codecov/c/github/JoshCrozier/minimal-cli.svg?style=flat-square)](https://codecov.io/github/JoshCrozier/minimal-cli)
[![Dependencies](https://img.shields.io/david/JoshCrozier/minimal-cli.svg?style=flat-square)](https://david-dm.org/JoshCrozier/minimal-cli)
[![DevDependencies](https://david-dm.org/JoshCrozier/minimal-cli/dev-status.svg?style=flat-square)](https://david-dm.org/JoshCrozier/minimal-cli?type=dev)
[![Vulnerabilities](https://snyk.io/test/npm/minimal-cli/badge.svg?style=flat-square)](https://snyk.io/test/npm/minimal-cli)

A simple package for creating minimal command-line programs.

## Installation

    $ npm install minimal-cli --save

## Usage

Here is an example CLI tool that makes HTTP requests:

```js
#!/usr/bin/env node

const minimalCli = require('minimal-cli');
const cli = minimalCli({
  flags: [
    ['-u, --url <url>', 'string', 'Specify a URL for the HTTP request'],
    ['-v, --verbose', 'boolean', 'Show additional information']
  ]
});

// The `cli` object will contain the commands and flags upon script invocation
console.log(cli);
```

Invoke the script from the command-line:

    $ ./custom-script.js get --url https://example.com --verbose

Access the commands and flags in the `cli` object logged above.

```json
{
  "commands": ["get"],
  "flags": {
    "url": "https://example.com",
    "verbose": true
  }
}
```

Automatic `help` text is also generated based on the `options` object that is passed to `minimalCli`:

    $ ./custom-script.js --help

Output:

```
Usage: cli [command]

Options:
  -V, --version    Show version number                       [boolean]
  -u, --url <url>  Specify a URL for the HTTP request        [string]
  -v, --verbose    Show additional information               [boolean]
  -h, --help       Show help text                            [boolean]
```

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2019 [Josh Crozier](https://joshcrozier.com)