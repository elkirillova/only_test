import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'

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
			// Правила для TypeScript
			'@typescript-eslint/semi': ['error', 'never'],
			'@typescript-eslint/object-curly-spacing': ['error', 'always'],

			// Правила для React
			'react/jsx-curly-spacing': [
				'error',
				{
					when: 'always',
					children: { when: 'always' },
				},
			],

			// Правила форматирования
			'prettier/prettier': [
				'error',
				{
					semi: false,
					bracketSpacing: true,
					jsxBracketSameLine: false,
				},
			],
		},
		// rules: {
		// 	...ts.configs.recommended.rules,
		// 	...react.configs.recommended.rules,
		// 	...reactHooks.configs.recommended.rules,
		// 	'@typescript-eslint/semi': ['error', 'never'],
		// 	'prettier/prettier': [
		// 		'error',
		// 		{
		// 			endOfLine: 'auto',
		// 			semi: false,
		// 			bracketSpacing: true,
		// 			jsxBracketSameLine: false,
		// 		},
		// 	],
		// 	'@typescript-eslint/explicit-module-boundary-types': 'off',
		// 	'react/react-in-jsx-scope': 'off',
		// 	'@typescript-eslint/semi': ['error', 'never'],
		// 	'@typescript-eslint/object-curly-spacing': ['error', 'always'],

		// 	// Специально для JSX
		// 	'react/jsx-curly-spacing': [
		// 		'error',
		// 		{
		// 			when: 'always',
		// 			children: { when: 'always' },
		// 		},
		// 	],
		// },
	},
]
