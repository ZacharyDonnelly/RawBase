module.exports = {
  extends: [
    'stylelint-config-idiomatic-order',
    'stylelint-a11y/recommended',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],
  overrides: [
    {
      files: ['./src/**/*.(scss|css)', './src/*.{scss,css}'],
      customSyntax: 'postcss-html',
      rules: {
        'prettier/prettier': 'warn',
        // ===
        // PRETTIER
        // ===
        // HACK: to compensate for https://github.com/shannonmoeller/stylelint-config-prettier/issues/4
        // Modifying setting from Standard: https://github.com/stylelint/stylelint-config-standard/blob/7b76d7d0060f2e13a331806a09c2096c7536b0a6/index.js#L6
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['blockless-after-same-name-blockless', 'first-nested'],
            ignore: ['after-comment'],
            ignoreAtRules: ['else']
          }
        ],
        'function-calc-no-invalid': true,
        'function-no-unknown': true,
        'font-family-no-duplicate-names': true,
        'font-family-no-missing-generic-family-keyword': true,
        'unit-allowed-list': ['rem', 'vh', 'vw', '%', 'px', 's'],
        'max-nesting-depth': null,
        'string-quotes': 'double ',
        'no-descending-specificity': true,
        'no-duplicate-at-import-rules': true,
        'no-duplicate-selectors': true,
        // fixes for Vue single file components:
        'no-empty-source': null,
        'no-extra-semicolons': true,
        'no-invalid-double-slash-comments': true,
        'no-invalid-position-at-import-rule': true,
        'no-irregular-whitespace': true,
        'property-no-unknown': true,
        'comment-no-empty': true,
        // Allow SCSS and CSS module keywords beginning with `@`
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        // ===
        // SCSS
        // ===
        'scss/at-import-no-partial-leading-underscore': null,
        'scss/dollar-variable-colon-space-after': 'always',
        'scss/dollar-variable-colon-space-before': 'never',
        'scss/dollar-variable-pattern': '/^[a-z-]+$/',
        'scss/no-global-function-names': null,
        'scss/operator-no-newline-before': true,
        'scss/operator-no-unspaced': true,

        // custom plugins to work with
        'plugin/no-unsupported-browser-features': [
          true,
          {
            severity: 'warning',
            ignore: ['flexbox']
          }
        ],
        //
        // Selectors
        //
        'selector-class-pattern': null,
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep']
          }
        ],
        'selector-type-no-unknown': [
          true,
          {
            ignore: ['custom-elements']
          }
        ]
      }
    }
  ]
}
