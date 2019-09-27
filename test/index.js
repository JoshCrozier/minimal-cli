'use strict';

const expect = require('chai').expect;
const helpers = require('./helpers');
const execAsync = helpers.execAsync;
const minimalCli = require('./../index');

describe('minimal-cli', () => {
  it('should support command-line execution', done => {
    execAsync().then(() => done()).catch(done);
  });

  it('should output help information when executed from the command-line', done => {
    execAsync('--help').then(output => {
      expect(output).to.be.a('string');

      done();
    }).catch(done);
  });

  it('should throw type errors if invalid options are supplied', () => {
    const validateInput = input => expect(() => minimalCli(input)).to.throw(TypeError);

    [undefined, null, '', true, 0, []].forEach(validateInput);
  });

  it('should return an empty `commands` array and empty `flags` object when there are no arguments', () => {
    const cli = minimalCli({
      argv: []
    });

    expect(cli).to.have.property('commands').to.deep.equal([]);
    expect(cli).to.have.property('flags').to.deep.equal({});
    expect(cli).to.have.property('help').to.be.a('string');
  });

  it('should return the correct parsed commands/flags based on the provided arguments', () => {
    const cli = minimalCli({
      argv: ['alpha', 'beta', '--gamma', '--delta=1', '--epsilon', './path/to/file']
    });

    expect(cli).to.have.property('commands').to.deep.equal(['alpha', 'beta']);
    expect(cli).to.have.property('flags').to.deep.equal({ gamma: true, delta: 1, epsilon: './path/to/file' });
  });

  it('should output accurate default `help` information', () => {
    const cli = minimalCli({
      argv: []
    });

    expect(cli).to.have.property('help', helpers.DEFAULT_HELP_OUTPUT);
  });

  it('should output accurate `help` information when supplied with an array of flags', () => {
    const cli = minimalCli({
      argv: [],
      flags: [
        ['-u, --url <url>', 'string', 'Specify a URL for the HTTP request'],
        ['-v, --verbose', 'boolean', 'Show additional information']
      ]
    });

    expect(cli).to.have.property('help', helpers.CUSTOM_HELP_OUTPUT);
  });

  it('should support a custom help message', () => {
    const help = 'Custom help message for the CLI tool';
    const cli = minimalCli({
      help,
      argv: []
    });

    expect(cli).to.have.property('help', help);
  });

  it('should handle the aliasing of flags based on the supplied options', () => {
    const cli = minimalCli({
      argv: ['--verbose', '--url', 'https://google.com', '-t', 'GET'],
      flags: [
        ['-u, --url <url>', 'string', 'Specify a URL for the HTTP request'],
        ['-t, --type', 'string', 'The request type'],
        ['-v, --verbose', 'boolean', 'Show additional information'],
        ['-a', 'string', 'The user agent'],
        ['--payload', 'string', 'The stringified request payload when making a POST request']
      ]
    });

    expect(cli).to.have.property('flags').to.deep.equal({
      v: true,
      verbose: true,
      t: 'GET',
      type: 'GET',
      u: 'https://google.com',
      url: 'https://google.com'
    });
  });
});
