const u = require('../utils');
const Ajv = require('ajv');
const log = require('loglevel');

const optionsSchema = {
  type: 'object',
  properties: {
    permanentCache: {
      default: false,
      description: 'Use permanent caching of compiled files.',
      type: 'boolean'
    },

    babel: {
      default: 'false',
      description:
        'Use babel for script block transpilation. `true` will use your project' +
        ' babel config if found, if not it will use a default setting with `babel-preset-env`' +
        ' to set to `current node`. Using an object you can provide additional babel options,' +
        ' will merge with your babel config if found, if not the provided options will' +
        ' be used as is.',
      oneOf: [{ type: 'boolean' }, { type: 'object' }]
    }
  },

  additionalProperties: false
};

/**
 * @type {() => Object<string, any>}
 */
const getDefaultConfig = () => ({
  permanentCache: false,
  babel: false
});

/**
 * @type {() => Object<string, any>}
 */
const getDefaultBabelOptions = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'current node'
      }
    ]
  ],

  exclude: /node_modules/
});

/**
 * @type {() => boolean}
 */
const isTemplateCompilerTipsOutputEnabled = () => {
  return !process.env.REQ_EXT_VUE_SILENCE_TEMPLATE_COMPILER_TIPS;
};

/**
 * @type {() => boolean}
 */
const isTemplateCompilerErrorsOutputEnabled = () => {
  return !process.env.REQ_EXT_VUE_SILENCE_TEMPLATE_COMPILER_ERRORS;
};

/**
 * @type {() => boolean}
 */
const isParserErrorsOutputEnabled = () => {
  return !process.env.REQ_EXT_VUE_SILENCE_PARSER_ERRORS;
};

/**
 * @type {(config: Object<string, any>) => boolean}
 */
const isPermanentCacheEnabled = u.propEqTrue('permanentCache');

/**
 * @type {(config: Object<string, any>) => boolean}
 */
const isBabelEnabled = u.compose(u.either(u.equals(true), u.isNotEmptyObject), u.prop('babel'));

/**
 * @type {(config: Object<string, any>) => boolean}
 */
const isBabelConfigured = u.compose(u.isNotEmptyObject, u.prop('babel'));

/**
 * @type {(config: Object<string, any>) => Object<string, any>}
 */
const getBabelOptions = u.ifElse(isBabelConfigured, u.prop('babel'), u.always({}));

/**
 * @type {(options: Object<string, any>, config: Object<string, any>) => Object<string, any>}
 */
const initConfig = options => {
  if (options) verifyOptions(options);
  return u.mergeDeepRight(getDefaultConfig(), options || {});
};

/**
 * @type {(options: Object<string, any>) => void}
 */
const verifyOptions = options => {
  const ajv = new Ajv();
  const isValid = ajv.validate(optionsSchema, options);
  if (!isValid) {
    log.error('[require-extension-vue: error] Invalid options are provided:\n\n', ajv.errors);
    process.exit(1);
  }
};

let _config = getDefaultConfig();

exports = module.exports = {
  getBabelOptions: () => getBabelOptions(_config),
  getDefaultBabelOptions,
  isBabelConfigured: () => isBabelConfigured(_config),
  isBabelEnabled: () => isBabelEnabled(_config),
  isPermanentCacheEnabled: () => isPermanentCacheEnabled(_config),
  initConfig: options => (_config = initConfig(options)),
  isParserErrorsOutputEnabled,
  isTemplateCompilerErrorsOutputEnabled,
  isTemplateCompilerTipsOutputEnabled
};