import jsdoc from 'eslint-plugin-jsdoc'

export default [
  {
    files: ['src/**/*.js', 'public/**/*.js', '*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    plugins: { jsdoc },
    rules: {
      semi: ['error', 'never'],
      'no-unused-vars': 'error',
      quotes: ['error', 'single'],
      eqeqeq: 'error',
      // JSDoc
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true
          }
        }
      ]
    }
  },
    // test regler
  {
    files: ['test/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    // Ev. extra plugins för test, t.ex. jest eller jsdoc
    plugins: { jsdoc },
    rules: {
      semi: ['error', 'never'],
      'no-unused-vars': 'warn',
      quotes: ['error', 'single'],
      eqeqeq: 'error',
      // JSDoc, ev. mindre strikt eller justerat
      'jsdoc/check-param-names': 'warn'
      // Lägg till de regler du vill ha för test om de ska skilja sig
    }
  }
]

