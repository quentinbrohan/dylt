const fs = require('fs');
const path = require('path');

const eslintConfig = fs.readFileSync(path.resolve(__dirname, './config/eslintConfig.ts'), 'utf8');
const tsEslintConfig = fs.readFileSync(path.resolve(__dirname, './config/tsEslintConfig.ts'), 'utf8');

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: './tsconfig.json',
        // createDefaultProgram: true,
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        modules: true,
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        // support import modules from TypeScript files in JavaScript files
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
        'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
    },
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    rules: {
        // eslintConfig,
        // tsEslintConfig,
        'import/no-named-as-default': 'off',
        'no-console': 'error',
        'no-undef': 'error',
        'react/jsx-props-no-spreading': 'off',
    },
};
