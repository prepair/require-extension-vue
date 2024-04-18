// @ts-check

const fse = require('fs-extra');
const path = require('node:path');
const log = require('loglevel');
const _findCacheDir = require('find-cache-dir');
const u = require('./utils');

const findCacheDir = (options = {}) => {
  return _findCacheDir({ name: moduleName, ...options });
};

/**
 * @typedef { import('./types').VueMetadata } VueMetadata
 *
 * @typedef { Object } CacheMetadata
 * @property { number | null } mtimeMs
 * @property { { path: string, mtimeMs: number } | null  } externalTemplate
 * @property { { path: string, mtimeMs: number } | null } externalScript
 */

const ENCODING_UTF8 = 'utf8';
const moduleName = 'require-extension-vue';
const cacheMetadataFile = 'revue.json';
const cwd = path.resolve('.');

/**
 * @type Record<string, CacheMetadata>
 */
let _cacheMetadata = {};

/**
 * @type {() => void}
 */
const initialize = () => {
  log.info('[require-extension-vue info] initializing permanent cache');
  _cacheMetadata = getCacheMetadata() || {};
};

/**
 * @type {() => Record<string, CacheMetadata> | null}
 */
const getCacheMetadata = () => {
  /** @type { Record<string, CacheMetadata> | null } */
  let cacheMetadata = null;

  const cacheMetadataFilePath = getCacheMetadataFilePath();
  const isCacheMetadataFileExists = fse.existsSync(cacheMetadataFilePath);
  log.info(
    `[require-extension-vue info] cache metadata is ${
      isCacheMetadataFileExists ? 'exists' : 'not exists'
    }`
  );
  if (!isCacheMetadataFileExists) return cacheMetadata;

  try {
    log.info(
      `[require-extension-vue info] reading cache metadata from ${cacheMetadataFilePath}`
    );
    cacheMetadata = JSON.parse(fse.readFileSync(cacheMetadataFilePath, 'utf8'));
  } catch {
    log.error(
      `[require-extension-vue error] failed to read cache metadata from: ${cacheMetadataFilePath}`
    );
  }

  return cacheMetadata;
};

/**
 * @type {() => void}
 */
// const cleanCache = () => {
//   fse.emptyDirSync(cachePath);
// };

/**
 * @type { (filePath: string) => string | null }
 */
const getCachedFile = (filePath) => {
  if (!hasCachedFile(filePath)) {
    log.info('[require-extension-vue info] cached compiled file not found');
    return null;
  }
  const cachedFilePath = getCachedFilePath(filePath);
  log.info(
    `[require-extension-vue info] cached compiled file found: ${cachedFilePath}`
  );
  return fse.readFileSync(cachedFilePath, ENCODING_UTF8);
};

/**
 * @type {(vueMetada: VueMetadata, content: string) => void}
 */
const setCachedFile = (vueMetadata, content) => {
  const cachedFilePath = getCachedFilePath(vueMetadata.filePath);
  log.info(
    `[require-extension-vue info] caching compiled file at: ${cachedFilePath}`
  );

  log.info(
    `[require-extension-vue info] writing compiled file to cache: ${vueMetadata.filePath} => ${cachedFilePath}`
  );
  fse.outputFileSync(cachedFilePath, content, ENCODING_UTF8);

  updateCacheMetadata(vueMetadata);
};

/**
 * @type {(vueMetada: VueMetadata) => void}
 */
const updateCacheMetadata = (vueMetadata) => {
  const cacheMetadataFilePath = getCacheMetadataFilePath();
  const cacheKey = toCwdRelativeMetadataPath(vueMetadata.filePath);
  log.info(
    `[require-extension-vue info] updating cache metadata of '${cacheKey}' in memory and on disk at ${cacheMetadataFilePath}`
  );
  _cacheMetadata = u.assoc(
    cacheKey,
    getCacheMetadataValue(vueMetadata),
    _cacheMetadata
  );
  fse.outputFileSync(
    cacheMetadataFilePath,
    JSON.stringify(_cacheMetadata, null, 2),
    ENCODING_UTF8
  );
};

/**
 * @type {(filePath: string) => boolean}
 */
const hasCachedFile = (filePath) => {
  const cachedMetadata = _cacheMetadata[toCwdRelativeMetadataPath(filePath)];
  if (!cachedMetadata) return false;
  const currentMetadata = getCacheMetadataValue({
    filePath,
    externalScriptPath: u.pathOr(
      null,
      ['externalScript', 'path'],
      cachedMetadata
    ),
    externalTemplatePath: u.pathOr(
      null,
      ['externalTemplate', 'path'],
      cachedMetadata
    ),
  });
  return u.equals(cachedMetadata, currentMetadata);
};

/**
 * @type {(filePath: string) => string}
 */
const toCwdRelativeMetadataPath = (filePath) =>
  filePath
    .replace(cwd, '')
    .replace(/^[/\\]/, '')
    // note: we want unix style paths in metadata json
    .replaceAll('\\', '/');

/**
 * @type {(vueMetada: VueMetadata) => CacheMetadata}
 */
const getCacheMetadataValue = (vueMetadata) => {
  // note: vueMetadata.filePath always exists for sure that is what triggered the
  //  hook in the first place
  const vueMtimeMs = mtimeMs(vueMetadata.filePath);
  const extScriptMtimeMs = mtimeMs(vueMetadata.externalScriptPath);
  const extTemplateMtimeMs = mtimeMs(vueMetadata.externalTemplatePath);

  return {
    mtimeMs: vueMtimeMs,

    externalScript: extScriptMtimeMs
      ? {
          path: toCwdRelativeMetadataPath(
            /** @type string */ (vueMetadata.externalScriptPath)
          ),
          mtimeMs: extScriptMtimeMs,
        }
      : null,

    externalTemplate: extTemplateMtimeMs
      ? {
          path: toCwdRelativeMetadataPath(
            /** @type string */ (vueMetadata.externalTemplatePath)
          ),
          mtimeMs: extTemplateMtimeMs,
        }
      : null,
  };
};

/**
 * @type {(filePath: string | null | undefined) => number | null}
 */
const mtimeMs = (filePath) => {
  if (!filePath) return null;
  const _path = path.resolve(filePath);
  if (!fse.existsSync(_path)) return null;
  return fse.statSync(_path).mtimeMs;
};

/**
 * @type {() => string}
 */
const getCacheMetadataFilePath = () => {
  const thunk = /** @type {(s: string) => string} */ (
    /** @type { unknown } */ (findCacheDir({ thunk: true }))
  );
  return thunk(cacheMetadataFile);
};

/**
 * @type {(filePath: string) => string}
 */
const getCachedFilePath = (filePath) => {
  const thunk = /** @type {(s: string) => string} */ (
    /** @type { unknown } */ (findCacheDir({ thunk: true }))
  );
  return thunk(filePath.replace(cwd, ''));
};

exports = module.exports = {
  getCachedFile,
  setCachedFile,
  initialize,
};
