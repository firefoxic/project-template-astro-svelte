import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "astro/config"
import { getProjectRoot } from "@firefoxic/utils"
import sitemap from "@astrojs/sitemap"
import svelte from "@astrojs/svelte"

// https://astro.build/config
export default defineConfig({
	base: getProjectRoot(),
	build: {
		assets: `assets`,
	},
	integrations: [
		svelte(),
		sitemap(),
	],
	scopedStyleStrategy: `class`,
	server: {
		host: true,
	},
	site: `https://firefoxic.github.io/project-template-astro-svelte/`,
	vite: {
		build: {
			assetsInlineLimit: 0,
			cssMinify: undefined,
			emptyOutDir: true,
			target: browserslistToEsbuild(),
		},
		css: {
			transformer: `postcss`,
		},
	},
})
