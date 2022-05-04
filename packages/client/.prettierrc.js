'use strict'

module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  semi: false,
  overrides: [
    {
      files: ['package.json', 'yarn.lock', '*.md'],
      options: {
        printWidth: 80,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
      }
    }
  ]
}
