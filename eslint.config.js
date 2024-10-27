import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{js,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            '@stylistic': stylistic,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/object-curly-spacing': [
                'error', 
                'always', {
                    arraysInObjects: true,
                    objectsInObjects: true
                }],
            '@stylistic/key-spacing': ['error', { beforeColon: false }],
            '@stylistic/comma-dangle': ['error', 'never'],
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ]
        }
    }
);
