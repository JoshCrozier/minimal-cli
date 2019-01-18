#!/usr/bin/env node

'use strict';

const minimalCli = require('./../index');
const cli = minimalCli({
  flags: [
    ['-u, --url <url>', 'string', 'Specify a URL for the HTTP request'],
    ['-v, --verbose', 'boolean', 'Show additional information']
  ]
});

console.log(cli);
