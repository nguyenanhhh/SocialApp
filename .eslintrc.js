module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended'],
  parserOptions: { ecmaVersion: 'latest' },
  plugins: ['react', 'react-native'],
  rules: {
    // most of under rules were deprecated ESLint v8.53.0

    'react/react-in-jsx-scope': 'off',

    'react/prop-types': 0,
    'react/display-name': 0,

    // 'no-console': 1,
    'no-lonely-if': 1,

    // require using all variable decliring
    'no-unused-vars': 1,

    // no space at the end of lines
    'no-trailing-spaces': 1,

    // total space between 2 any elemememt
    'no-multi-spaces': 1,

    // the maximum break lines between 2 lines
    'no-multiple-empty-lines': 2,

    // require a space before blocks - not apply with blocks begin a new line
    'space-before-blocks': ['error', 'always'],

    // indent start a line
    indent: ['error', 2, { SwitchCase: 1 }],

    // enforces consistent use of semicolons
    semi: [1, 'never'],

    // enforces the consistent use of either backticks, double, or single quotes.
    quotes: ['error', 'single'],

    'object-curly-spacing': [1, 'always'],
    'array-bracket-spacing': 1,

    // define linebreak style
    'linebreak-style': 0,

    // no unexpected line could cause error
    'no-unexpected-multiline': 'warn',

    // enforces consisstent spacing around keywords
    'keyword-spacing': ['warn', { before: true, after: true }],

    // enforces consistent use of comma after last element in object and array => not having
    'comma-dangle': ['warn', 'never'],

    // enforces consistent spacing before and after commas in variable declarations, array literals, object literals, function parameters, and sequences.
    'comma-spacing': ['error', { before: false, after: true }],

    // Enforce consistent spacing before and after the arrow in arrow functions
    'arrow-spacing': ['warn', { before: true, after: true }]
  }
}
