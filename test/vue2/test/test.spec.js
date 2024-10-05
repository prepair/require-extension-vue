const path = require('node:path');
const { expect } = require('chai');
const sinon = require('sinon');
const log = require('loglevel');
const { expectComponent, expectFunctionalComponent } = require('./common');

// eslint-disable-next-line mocha/no-empty-description
describe('', () => {
  beforeEach(() => {
    sinon.spy(log, 'error');
    sinon.spy(log, 'warn');
  });

  it('should work comment node before a div (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/comment-node-ts').default;
    expectComponent(component, {
      name: 'CommentNodeTs',
      renderContains: 'Comment Node (ts)',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should work comment node before a div (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/comment-node-esm').default;
    expectComponent(component, {
      name: 'CommentNodeEsm',
      renderContains: 'Comment Node (esm)',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should work comment node before a div (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/comment-node-cjs');
    expectComponent(component, {
      name: 'CommentNodeCjs',
      renderContains: 'Comment Node (cjs)',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup + script (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-script-esm').default;
    expectComponent(component, {
      name: 'ScriptSetupScriptEsm',
      renderContains: 'template: Script Setup Script (esm):',
      setupContains: `script setup: Hello Script Setup Script (esm)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup + script (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/script-setup-script-cjs');
    expectComponent(component, {
      name: 'ScriptSetupScriptCjs',
      renderContains: 'template: Script Setup Script (cjs):',
      setupContains: `script setup: Hello Script Setup Script (cjs)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup + script (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-script-ts').default;
    expectComponent(component, {
      name: 'ScriptSetupScriptTs',
      renderContains: 'template: Script Setup Script (ts):',
      setupContains: `script setup: Hello Script Setup Script (ts)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup + script', function () {
    require('../../..')();
    const component = require('./fixtures/script-setup-script');
    expectComponent(component, {
      name: 'ScriptSetupScript',
      renderContains: 'Script Setup Script',
      setupContains: 'return { __sfc: true,ref, msg }',
    });
  });

  it('should parse a vue file with script setup + script only (esm)', () => {
    require('../../..')({ babel: true });
    const component =
      require('./fixtures/script-setup-script-only-esm').default;
    expectComponent(component, {
      name: 'ScriptSetupScriptOnlyEsm',
      setupContains: `script setup: Hello Script Setup Script Only (esm)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup + script only (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/script-setup-script-only-cjs');
    expectComponent(component, {
      name: 'ScriptSetupScriptOnlyCjs',
      setupContains: `script setup: Hello Script Setup Script Only (cjs)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup + script only (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-script-only-ts').default;
    expectComponent(component, {
      name: 'ScriptSetupScriptOnlyTs',
      setupContains: `script setup: Hello Script Setup Script Only (ts)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-esm');
    expectComponent(component, {
      renderContains: 'template: Script Setup (esm):',
      setupContains: `script setup: Hello Script Setup (esm)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/script-setup-cjs');
    expectComponent(component, {
      renderContains: 'template: Script Setup (cjs):',
      setupContains: `script setup: Hello Script Setup (cjs)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-ts');
    expectComponent(component, {
      renderContains: 'template: Script Setup (ts):',
      setupContains: `script setup: Hello Script Setup (ts)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup only (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-only-esm');
    expectComponent(component, {
      setupContains: `script setup: Hello Script Setup Only (esm)'`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup only (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/script-setup-only-cjs');
    expectComponent(component, {
      setupContains: `script setup: Hello Script Setup Only (cjs)'`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script setup only (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-setup-only-ts');
    expectComponent(component, {
      setupContains: `script setup: Hello Script Setup Only (ts)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-esm').default;
    expectComponent(component, {
      name: 'ScriptEsm',
      renderContains: 'template: Script (esm):',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/script-cjs');
    expectComponent(component, {
      name: 'ScriptCjs',
      renderContains: 'template: Script (cjs):',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-ts').default;
    expectComponent(component, {
      name: 'ScriptTs',
      renderContains: 'template: Script (ts):',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with setup fn (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/setup-fn-cjs');
    expectComponent(component, {
      name: 'SetupFnCjs',
      renderContains: 'template: Setup Fn (cjs):',
      setupContains: `setup: Hello Setup Fn (cjs)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with setup fn (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/setup-fn-esm').default;
    expectComponent(component, {
      name: 'SetupFnEsm',
      renderContains: 'template: Setup Fn (esm):',
      setupContains: `setup: Hello Setup Fn (esm)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with setup fn (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/setup-fn-ts').default;
    expectComponent(component, {
      name: 'SetupFnTs',
      renderContains: 'template: Setup Fn (ts):',
      setupContains: `setup: Hello Setup Fn (ts)`,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with setup fn', function () {
    require('../../..')();
    const component = require('./fixtures/setup-fn');
    expectComponent(component, {
      name: 'SetupFn',
      renderContains: 'Setup Fn',
      setupContains: 'return { msg }',
    });
  });

  it('should parse an empty vue file', function () {
    require('../../..')();
    const component = require('./fixtures/empty');
    expectComponent(component);
  });

  it('should parse a vue file with empty blocks', function () {
    require('../../..')();
    const component = require('./fixtures/empty');
    expectComponent(component);
  });

  it('should parse a simple vue file with default export', function () {
    require('../../..')();
    const component = require('./fixtures/simple-exports-default').default;
    expectComponent(component, {
      name: 'SimpleExportsDefault',
      renderContains: 'Simple Exports Default',
    });
  });

  it('should parse a simple vue file with exports', function () {
    require('../../..')();
    const component = require('./fixtures/simple-exports');
    expectComponent(component, {
      name: 'SimpleExports',
      renderContains: 'Simple Exports',
    });
  });

  it('should parse a vue file with template only', function () {
    require('../../..')();
    const component = require('./fixtures/template-only');
    expectComponent(component, { renderContains: 'Template Only' });
  });

  it('should parse a vue file with script only (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/script-only-cjs');
    expectComponent(component, { name: 'ScriptOnlyCjs' });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script only (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-only-esm').default;
    expectComponent(component, { name: 'ScriptOnlyEsm' });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script only (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/script-only-ts').default;
    expectComponent(component, { name: 'ScriptOnlyTs' });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with script only', function () {
    require('../../..')();
    const component = require('./fixtures/script-only');
    expectComponent(component, { name: 'ScriptOnly' });
  });

  it('should parse a vue file with template + empty script', function () {
    require('../../..')();
    const component = require('./fixtures/template-empty-script');
    expectComponent(component, { renderContains: 'Template Empty Script' });
  });

  it('should parse a vue file with external sources', function () {
    require('../../..')();
    const component = require('./fixtures/external-template-script-style');
    expectComponent(component, {
      name: 'ExternalTemplateScriptStyle',
      renderContains: 'External Template Script Style',
    });
  });

  it('should parse a functional vue component (template)', function () {
    require('../../..')();
    const component = require('./fixtures/functional-template');
    expectFunctionalComponent(component, {
      name: 'FunctionalTemplate',
      renderContains: 'Functional Template',
    });
  });

  it('should parse a functional vue component (external template)', function () {
    require('../../..')();
    const component = require('./fixtures/functional-external-template.vue');
    expectFunctionalComponent(component, {
      name: 'FunctionalExternalTemplate',
      renderContains: 'Functional External Template',
    });
  });

  it('should parse a functional vue component (render)', function () {
    require('../../..')();
    const component = require('./fixtures/functional-render');
    expectFunctionalComponent(component, {
      name: 'FunctionalRender',
      renderContains: 'Functional Render',
      _compiled: false,
    });
  });

  it('should parse a vue file with external sources (esm)', () => {
    require('../../..')({ babel: true });
    const component =
      require('./fixtures/external-template-script-style-esm').default;
    expectComponent(component, {
      name: 'ExternalTemplateScriptStyleEsm',
      renderContains: 'template: External Template Script Style (esm):',
      setupContains: "setup: External Template Script Style (esm)'",
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with external sources (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/external-template-script-style-cjs');
    expectComponent(component, {
      name: 'ExternalTemplateScriptStyleCjs',
      renderContains: 'template: External Template Script Style (cjs):',
      setupContains: "setup: External Template Script Style (cjs)'",
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should parse a vue file with external sources (ts)', () => {
    require('../../..')({ babel: true });
    const component =
      require('./fixtures/external-template-script-style-ts').default;
    expectComponent(component, {
      name: 'ExternalTemplateScriptStyleTs',
      renderContains: 'template: External Template Script Style (ts):',
      setupContains: "setup: External Template Script Style (ts)'",
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn setup provided (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/render-fn-setup-cjs');
    expectComponent(component, {
      name: 'RenderFnSetupCjs',
      setupContains: 'Render Fn Setup (cjs)',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn setup provided (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/render-fn-setup-esm').default;
    expectComponent(component, {
      name: 'RenderFnSetupEsm',
      setupContains: 'Render Fn Setup (esm)',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn setup provided (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/render-fn-setup-ts').default;
    expectComponent(component, {
      name: 'RenderFnSetupTs',
      setupContains: 'Render Fn Setup (ts)',
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn provided (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/render-fn-cjs');
    expectComponent(component, {
      name: 'RenderFnCjs',
      renderContains: 'Render Fn (cjs)',
      _compiled: false,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn provided (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/render-fn-esm').default;
    expectComponent(component, {
      name: 'RenderFnEsm',
      renderContains: 'Render Fn (esm)',
      _compiled: false,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn provided (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/render-fn-ts').default;
    expectComponent(component, {
      name: 'RenderFnTs',
      renderContains: 'Render Fn (ts)',
      _compiled: false,
    });
    expect(log.error.notCalled).to.equal(true);
  });

  it('should ignore template when render fn provided (normal)', function () {
    require('../../..')();
    const component = require('./fixtures/render-fn-normal');
    expectComponent(component, {
      name: 'RenderFnNormal',
      renderContains: 'Render Fn Normal',
      _compiled: false,
    });
  });

  it('should ignore template when render fn provided (functional)', function () {
    require('../../..')();
    const component = require('./fixtures/render-fn-functional');
    expectFunctionalComponent(component, {
      name: 'RenderFnFunctional',
      renderContains: 'Render Fn Functional',
      _compiled: false,
    });
  });

  it('should print error on console when parser error happens (ts)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/error-parser-ts');
    expect(log.error.calledTwice).to.equal(true);
    expect(log.error.firstCall.args[0]).to.match(
      /\[require-extension-vue] parser errors in file: .*error-parser-ts.vue$/
    );
    expect(log.error.secondCall.args[0]).to.equal(
      '[require-extension-vue: parser error] tag <templatet> has no matching end tag.'
    );
    expectComponent(component);
  });

  it('should print error on console when parser error happens (esm)', () => {
    require('../../..')({ babel: true });
    const component = require('./fixtures/error-parser-esm');
    expect(log.error.calledTwice).to.equal(true);
    expect(log.error.firstCall.args[0]).to.match(
      /\[require-extension-vue] parser errors in file: .*error-parser-esm.vue$/
    );
    expect(log.error.secondCall.args[0]).to.equal(
      '[require-extension-vue: parser error] tag <templatet> has no matching end tag.'
    );
    expectComponent(component);
  });

  it('should print error on console when parser error happens (cjs)', () => {
    require('../../..')();
    const component = require('./fixtures/error-parser-cjs');
    expect(log.error.calledTwice).to.equal(true);
    expect(log.error.firstCall.args[0]).to.match(
      /\[require-extension-vue] parser errors in file: .*error-parser-cjs.vue$/
    );
    expect(log.error.secondCall.args[0]).to.equal(
      '[require-extension-vue: parser error] tag <templatet> has no matching end tag.'
    );
    expectComponent(component);
  });

  it('should print error on console when parser error happens', function () {
    require('../../..')();
    const component = require('./fixtures/error-parser');
    expect(log.error.calledTwice).to.equal(true);
    expect(log.error.firstCall.args[0]).to.match(
      /\[require-extension-vue] parser errors in file: .*error-parser.vue$/
    );
    expect(log.error.secondCall.args[0]).to.equal(
      '[require-extension-vue: parser error] tag <templatet> has no matching end tag.'
    );
    expectComponent(component);
  });

  it('should print error on console when template has multiple root elements', function () {
    require('../../..')();
    const component = require('./fixtures/error-multi-root');
    expect(log.error.calledTwice).to.equal(true);
    expect(log.error.firstCall.args[0]).to.match(
      /\[require-extension-vue] compiler errors in file: .*error-multi-root.vue$/
    );
    expect(log.error.secondCall.args[0]).to.match(
      /Component template should contain exactly one root element\. If you are using v-if on multiple elements, use v-else-if to chain them instead\./
    );
    expectComponent(component, { name: 'ErrorMultiRoot' });
  });
});

it('should parse a simple vue file with es module export when `babel` option is true and no babel config', function () {
  require('../../..')({ babel: true });
  const component =
    require('./fixtures/simple-export-babel-no-ext-conf').default;
  expectComponent(component, {
    name: 'SimpleExportBabelNoExtConf',
    renderContains: 'Simple Export Babel No Ext Conf',
  });
});

it('should parse a vue file with external es module export when `babel` option is true and no babel config', function () {
  require('../../..')({ babel: true });
  const component =
    require('./fixtures/external-script-babel-no-ext-conf').default;
  expectComponent(component, {
    name: 'ExternalScriptBabelNoExtConf',
    renderContains: 'External Script Babel No Ext Conf',
  });
});

it('should parse a simple vue file with es module export when `babel` option configured', function () {
  require('../../..')({
    babel: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'current node',
          },
        ],
      ],
    },
  });
  const component =
    require('./fixtures/simple-export-babel-no-ext-conf').default;
  expectComponent(component, {
    name: 'SimpleExportBabelNoExtConf',
    renderContains: 'Simple Export Babel No Ext Conf',
  });
});

it('should parse a simple vue file with es module export when .babelrc is used', function () {
  require('../../..')({
    babel: {
      cwd: path.resolve(__dirname, 'fixtures', 'simple-export-babel-babelrc'),
      babelrc: true,
    },
  });
  const component = require('./fixtures/simple-export-babel-babelrc').default;
  expectComponent(component, {
    name: 'SimpleExportBabelBabelrc',
    renderContains: 'Simple Export Babel Babelrc',
  });
});

it('should parse a simple vue file with es module export when babel.config.js is used', function () {
  require('../../..')({
    babel: {
      cwd: path.resolve(
        __dirname,
        'fixtures',
        'simple-export-babel-babel-config-js'
      ),
      babelrc: false,
    },
  });
  const component =
    require('./fixtures/simple-export-babel-babel-config-js').default;
  expectComponent(component, {
    name: 'SimpleExportBabelBabelConfigJs',
    renderContains: 'Simple Export Babel Babel Config Js',
  });
});
