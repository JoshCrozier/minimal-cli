'use strict';

const minimalCliParser = require('minimal-cli-parser');

class MinimalCli {
  constructor(
    options
  ) {
    this.options = this.normalizeOptions(options);
  }

  get argv() {
    return this.options.argv || process.argv.slice(2);
  }

  get helpUsageText() {
    const usage = [
      'Usage: cli [command]',
      ''
    ];

    return usage;
  }

  get helpFlagsText() {
    const longestFlagLength = Math.max(...this.options.flags.map(flag => flag.name.length));
    const longestDescLength = Math.max(40, ...this.options.flags.map(flag => flag.description.length));

    const flags = [
      'Options:',
      this.options.flags.map(flag => [
        '',
        flag.name.padEnd(longestFlagLength),
        flag.description.padEnd(longestDescLength),
        `[${flag.type}]`
      ].join('  ')).join('\n'),
      ''
    ];

    return flags;
  }

  get helpText() {
    return this.options.help || [
      ...this.helpUsageText,
      ...this.helpFlagsText
    ].join('\n');
  }

  parse() {
    const args = minimalCliParser(this.argv);
    const { _, ...flags } = args;
    const help = this.helpText;

    if (args.help) {
      this.outputHelp();
    }

    return {
      commands: _,
      flags,
      help
    };
  }

  validateOptions(options) {
    const hasOptions = options !== undefined;
    const isObject = typeof options === 'object' && options !== null && !Array.isArray(options);

    if (!hasOptions || !isObject) {
      throw new TypeError('Invalid input: An object with options is expected.');
    }
  }

  normalizeOptions(options) {
    this.validateOptions(options);

    options = {
      flags: [],
      ...options
    };

    options.flags.unshift(['-V, --version', 'boolean', 'Show version number']);
    options.flags.push(['-h, --help', 'boolean', 'Show help text']);

    options.flags = this.normalizeFlags(options.flags);

    return options;
  }

  normalizeFlags(flags) {
    return flags.map(flag => {
      const [name, type, description] = flag;

      return { name, type, description };
    });
  }

  outputHelp() {
    process.stdout.write(this.helpText);
    process.exit();
  }
}

module.exports = options => {
  return new MinimalCli(options).parse();
};
