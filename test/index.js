'use strict';

const expect = require('chai').expect;
const execAsync = require('./helpers').execAsync;
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
      argv: ['alpha', 'beta', '--gamma', '--delta=1']
    });

    expect(cli).to.have.property('commands').to.deep.equal(['alpha', 'beta']);
    expect(cli).to.have.property('flags').to.deep.equal({ gamma: true, delta: 1 });
  });

  it('should support a custom help message', () => {
    const help = 'Custom help message for the CLI tool';
    const cli = minimalCli({
      help,
      argv: []
    });

    expect(cli).to.have.property('help', help);
  });
});
