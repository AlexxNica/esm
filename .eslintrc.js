module.exports = {
  extends: ["plugin:import/errors"],
  parser: "eslint-plugin-import/memo-parser",
  env: {
    es6: true,
    mocha: true,
    node: true
  },
  globals: {
    __non_webpack_filename__: false,
    __non_webpack_module__: false
  },
  parserOptions: {
    ecmaVersion: 8,
    parser: "babel-eslint"
  },
  rules: {
    "brace-style": ["error", "1tbs"],
    "consistent-return": "error",
    curly: "error",
    "eol-last": "error",
    "keyword-spacing": "error",
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undefined": "error",
    "no-unused-vars": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    semi: ["error", "never"],
    "sort-imports": ["error", { ignoreCase: true }],
    "sort-keys": ["error", "asc", { caseSensitive: true, natural: true }],
    "sort-vars": "error",
    "space-before-function-paren": ["error", { anonymous: "always", named: "never" }],
    strict: "error",
    "quote-props": ["error", "consistent-as-needed"],
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }]
  }
}