// @ts-check

/**
 * based on: https://github.com/vuejs/vue-loader/blob/bf901cbffd7211e22d83972811db0e979e4f577a/lib/compiler.js
 */

/**
 * @type { { compiler: CompilerSfc } }
 */
let cached;

/**
 * @typedef {Object} CompilerSfc
 * @property {import('vue/compiler-sfc').parse} parse
 * @property {import('vue/compiler-sfc').compileTemplate} compileTemplate
 * @property {import('vue/compiler-sfc').compileScript} compileScript
 * @property {import('vue/compiler-sfc').generateCodeFrame} generateCodeFrame
 */

/**
 * @type {() => { compiler: CompilerSfc }}
 */
const resolveCompiler = () => {
  if (cached) return cached;

  return (cached = {
    compiler: /** @type { CompilerSfc } */(loadFromContext('vue/compiler-sfc')),
  });
};

/** 
 * @type { (path: string) => unknown }
 */
const loadFromContext = (path) => {
  return require(
    require.resolve(path, {
      paths: [process.cwd()],
    })
  );
};

exports.resolveCompiler = resolveCompiler;
