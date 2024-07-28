import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginSvelte from "eslint-plugin-svelte"
import { default as firefoxicEslintConfig, globals } from "@firefoxic/eslint-config"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		ignores: [
			`dist/`,
			`src/shared/vendor/`,
			`index.js`,
		],
	},
	{
		ignores: [`src/`],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},
	{
		files: [`src/**/*.{astro,js,svelte}`],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: [`src/**/*.{astro,svelte}`],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},
	...firefoxicEslintConfig,
	...eslintPluginSvelte.configs[`flat/recommended`],
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			"@stylistic/js/semi": [
				`error`,
				`never`,
				{ beforeStatementContinuationChars: `any` },
			],
			"astro/no-set-text-directive": `error`,
			"astro/no-unused-css-selector": `error`,
			"astro/prefer-class-list-directive": `error`,
			"astro/prefer-object-class-list": `error`,
			"astro/prefer-split-class-list": `error`,
			"astro/semi": [
				`error`,
				`never`,
				{ beforeStatementContinuationChars: `always` },
			],
		},
	},
]
