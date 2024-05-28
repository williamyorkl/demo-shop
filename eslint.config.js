const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended.js");
const { fixupConfigRules } = require("@eslint/compat");

module.exports = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];
