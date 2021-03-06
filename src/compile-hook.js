const log = require('loglevel');
const compile = require('./compile');
const { isPermanentCacheEnabled } = require('./config');
const { getCachedFile, setCachedFile } = require('./cache');

let compiling = false;

const compileHook = (code, filename) => {
  log.info(
    `[require-extension-vue info] permanent cache is ${
      isPermanentCacheEnabled() ? 'enabled' : 'not enabled'
    }`
  );
  const cachedFile = isPermanentCacheEnabled() ? getCachedFile(filename) : null;
  if (cachedFile) {
    log.info('[require-extension-vue info] return with cached file');
    log.debug(
      `[require-extension-vue debug] cached file: ${JSON.stringify(
        cachedFile,
        null,
        2
      )}`
    );
    return cachedFile;
  }
  if (compiling) {
    log.warn(
      '[require-extension-vue info] compiling is already in progress, returning `code` as is'
    );
    return code;
  }

  try {
    compiling = true;
    const { code: compiledCode, vueMetadata } = compile(code, filename);
    if (isPermanentCacheEnabled()) {
      setCachedFile(vueMetadata, compiledCode);
    }
    return compiledCode;
  } finally {
    compiling = false;
  }
};

exports = module.exports = compileHook;
