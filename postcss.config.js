export default function (context) {
	return {
		map: context.env !== `production`,
		plugins: {
			"postcss-url": [
				{
					filter: `**/*.svg`,
					url: `inline`,
				},
			],
			"postcss-lightningcss": {
				lightningcssOptions: {
					minify: context.env === `production`,
				},
			},
		},
	}
}
