module.exports = {
	extends: ['stylelint-config-standard-scss'],
	plugins: ['stylelint-scss'],
	rules: {
		indentation: 'tab',
		'no-empty-source': null,
		'scss/at-rule-no-unknown': true,
		'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
	},
	ignoreFiles: ['**/*.js', '**/*.ts', '**/*.tsx'],
}
