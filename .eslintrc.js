module.exports = {
  root: true,
  extends: [
    'react-app',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: ['html'],
  env: {
    node: true,
    browser: true,
    es6: true
  },
  rules: {
    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'import/named': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/namespace': 'off',
    'generator-star-spacing': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    eqeqeq: 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'no-lonely-if': 'warn',
    curly: ['error', 'all'],
    'require-await': 'error',
    'dot-notation': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'no-useless-rename': 'error',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'none',
        printWidth: 100,
        bracketSpacing: true,
        endOfLine: 'auto',
        proseWrap: 'never'
      }
    ]
  }
};
