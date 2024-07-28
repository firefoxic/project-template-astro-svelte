export default {
	maxDensity: 2,
	formats: [
		`avif`,
		`webp`,
	],
	sizes: [
		{
			width: 2048,
			height: 1152,
			breakpoint: 1280,
		},
		{
			width: 1280,
			height: 848,
			breakpoint: 640,
		},
		{
			width: 640,
			height: 518,
		},
	],
	dests: [
		await import(`./eclipse-1280@2x.avif`).then((m) => m.default.src),
		await import(`./eclipse-1280@1x.avif`).then((m) => m.default.src),
		await import(`./eclipse-1280@2x.webp`).then((m) => m.default.src),
		await import(`./eclipse-1280@1x.webp`).then((m) => m.default.src),
		await import(`./eclipse-640@2x.avif`).then((m) => m.default.src),
		await import(`./eclipse-640@1x.avif`).then((m) => m.default.src),
		await import(`./eclipse-640@2x.webp`).then((m) => m.default.src),
		await import(`./eclipse-640@1x.webp`).then((m) => m.default.src),
		await import(`./eclipse@2x.avif`).then((m) => m.default.src),
		await import(`./eclipse@1x.avif`).then((m) => m.default.src),
		await import(`./eclipse@2x.webp`).then((m) => m.default.src),
		await import(`./eclipse@1x.webp`).then((m) => m.default.src),
	],
}
