module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'rules': {
    'semi': [2, 'never'],
    'max-len': [2, 120, 4, { 'ignoreUrls': true }],
    'object-curly-spacing': ['error', 'always'],
    "indent": "off",
    "no-tabs": 0,
    "no-unused-vars": "off",
    "require-jsdoc": "off",
    "no-invalid-this": "off",
    //"quote-props": "as-needed",
  },
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],

};
