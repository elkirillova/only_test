import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import perfectionist from 'eslint-plugin-perfectionist'

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
			perfectionist,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			semi: ['error', 'never'],
			'perfectionist/sort-imports': [
				'error',
				{
					customGroups: {
						type: { react: 'react' },
						value: { react: ['react', 'react-*'] },
					},
					groups: [
						'type',
						'react',
						'builtin',
						'external',
						'internal-type',
						'internal',
						'side-effect',
						'style',
					],
					newlinesBetween: 'always',
					order: 'asc',
					type: 'natural',
				},
			],
		},
	},
]
