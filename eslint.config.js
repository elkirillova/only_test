import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
	{
		files: ['**/*.{ts,tsx}'],
		ignores: ['node_modules', 'dist', 'build'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': ts,
			react,
			'react-hooks': reactHooks,
			prettier,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...ts.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
];
