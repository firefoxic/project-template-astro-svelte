# project-template-astro-svelte

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]

Project template based on Astro and Svelte.

## Minimum Required Environment

- **Terminal + git** — On Windows, install git with git-bash or use WSL.
- **Node.js** — Install following [the package manager instructions](https://nodejs.org/en/download/package-manager).

Node.js version requirements are specified in [package.json](./package.json).

The project is set up to work with **pnpm**, which can be activated with the following command if Node.js is installed:

```shell
corepack enable
```

Then, install the dependencies:

```shell
pnpm i
```

After installing the dependencies, you can start the dev server:

```shell
pnpm start
```

and begin development.

## Components

Independent (as much as possible) components are located in `src/components/`, as an [Astro](https://astro.build) or [Svelte](https://svelte.dev) _single file component_ named in PascalCase with the appropriate extension `.astro` or `.svelte`.

For component organization, follow the BEM methodology. For CSS classes, use the so-called React notation:

- Block named in PascalCase
- Elements named in PascalCase and separated from the block with a hyphen
- Modifiers named in camelCase and separated from blocks or elements with an underscore
- Modifier values named in camelCase and separated from the modifier name with an underscore

Example: `BlockName-ElemName_modName_modValue`.

## Common Files

Files that do not belong to a specific independent component but can be used both in and outside of components are placed in `src/shared/`.

## Markup

All page files should be named `index.astro` and placed in `src/pages/` in subdirectories corresponding to the route names. For example, the following source file structure:

```shell
└── src/
	└── pages/
		├── about/
		│	└── index.astro
		├── typography/
		│	└── index.astro
		└── index.astro
```

is built into:

```shell
└── dist/
	├── about/
	│	└── index.html
	├── typography/
	│	└── index.html
	└── index.html
```

Page files should only contain the unique content markup (the content of the `main` tag). Everything else is marked up in the base layout `src/layouts/BaseLayout.astro`, which extends the page markup.

When deploying to GitHub Pages to a project subdirectory, use the `normalizePath()` utility for paths to work correctly at different levels of the directory structure:

```diff
---
+import { normalizePath } from "../../utils/normalizePath.js"
---

-<a href="/about">About us</a>
+<a href={normalizePath(`/about`)}>About us</a>
```

## Styles

The individual CSS files of common styles in `src/shared/` are imported into the main file `src/styles/index.css`, which is imported into `src/layouts/BaseLayout.astro`. Styles from component files Astro itself adds to the resulting style file.

```shell
└── src/
	├── shared/
	│	├── global/
	│	│	├── colors.css
	│	│	├── focus.css
	│	│	└── images.css
	│	└── icons/
	│		└── index.css
	└── styles/
		└── index.css		# Main style file
```

## Scripts

Working with scripts is identical to working with styles, with the caveat that the main script files are located in `src/scripts/`.

## Graphics

### Images

Raster and content vector graphics (logos, charts, illustrations) should be placed in `src/shared/images/`.

If a raster image needs to adapt to viewport sizes, different versions of the image should be named with a numerical suffix (after the name, separated by a hyphen) corresponding to the breakpoint (viewport width from which this version should be displayed). The minimum version should remain without a breakpoint suffix.

Example of two images, each in three versions for different viewport sizes:

```shell
└── src/
	└── shared/
		└── images/
			├── aurora-1280.png
			├── aurora-640.png
			├── aurora.png
			├── eclipse-1280.png
			├── eclipse-640.png
			└── eclipse.png
```

Run `pnpm optimize:images`. By default, the command assumes these files are for double pixel density. This can be changed with the `-d` option, for example `pnpm optimize:images -d 3`. By default, the source files are converted to `.webp` and `.avif`. This can also be changed with the `-f` and `-a` options (see [option descriptions](https://github.com/firefoxic/conjure?tab=readme-ov-file#options)).

Additionally, the command will delete the source files after conversion and create `json` and `js` metadata files. For this project, `json` files are not needed and can be deleted, while `js` files are used in the `src/components/Picture.astro` component. The source files above will produce the following set of final files:

```shell
└── src/
	└── shared/
		└── images/
			├── aurora-1280@1x.avif
			├── aurora-1280@1x.webp
			├── aurora-1280@2x.avif
			├── aurora-1280@2x.webp
			├── aurora-640@1x.avif
			├── aurora-640@1x.webp
			├── aurora-640@2x.avif
			├── aurora-640@2x.webp
			├── aurora@1x.avif
			├── aurora@1x.webp
			├── aurora@2x.avif
			├── aurora@2x.webp
			├── aurora.js
			├── eclipse-1280@1x.avif
			├── eclipse-1280@1x.webp
			├── eclipse-1280@2x.avif
			├── eclipse-1280@2x.webp
			├── eclipse-640@1x.avif
			├── eclipse-640@1x.webp
			├── eclipse-640@2x.avif
			├── eclipse-640@2x.webp
			├── eclipse@1x.avif
			├── eclipse@1x.webp
			├── eclipse@2x.avif
			├── eclipse@2x.webp
			└── eclipse.js
```

Thus, after conversion, to insert an adaptive image into a page, it is enough to import the `Picture` component and call it by passing the image name to the `name` attribute and specifying other necessary attributes (see examples in the page files).

For background raster images, use `image-set()`.

Additionally, `pnpm optimize:images` optimizes vector images in `src/shared/images/`.

### Icons

Place vector icons in `src/shared/icons/` and run `pnpm optimize:icons` to optimize the icons and generate a `src/shared/icons/index.css` file with custom properties containing paths to these icon files.

In component styles, use these custom properties to insert the icon into a `background` or `mask`.

### Favicons

Place vector favicons in `public/` (not in `src/`!). File names should be as follows:

```shell
└── public/
	├── 16.svg		# Special version sized 16×16.
	├── 32.svg		# Main version sized 32×32.
	└── touch.svg	# Large touch icon without roundings and transparencies.
```

Add `16.svg` only if there is a special 16×16 version in the layout.

Run `pnpm optimize:favicons` to generate all necessary favicons, the web manifest, and the `Links.md` file with the needed `link` tags (copy this code into the `head` tag of the layout markup, after which `Links.md` can be deleted).

The result will be:

```shell
└── public/
	├── favicons/
	│	├── icon-180.png
	│	├── icon-192.png
	│	├── icon-192.webp
	│	├── icon-512.png
	│	├── icon-512.webp
	│	└── icon.svg
	├── favicon.ico
	└── manifest.webmanifest
```

If there are no special requirements for the `apple-touch-icon`, you can delete the `public/favicons/icon-180.png` file and the `link` referring to it.

If necessary, adjust the paths in the `link` tags and the web manifest.

## Fonts

If the project requires fonts available on [FontSource](https://fontsource.org/), use their font npm packages:

- Install them as production dependencies.
- Connect them in `src/shared/fonts/index.css`.
- Collect useful font metrics into corresponding custom properties (e.g., using FontForge or [Capsize](https://seek-oss.github.io/capsize/)) converted to `1em` units, i.e., divide the required values by the `unitsPerEm` value. For example, the `unitsPerEm` for the `Fira Code` font is `2000` — divide all required values by this number:
- `xHeight` = 1050 / 2000 = 0.525
- `capHeight` = 1374 / 2000 = 0.687
- `ascend` = 1980 / 2000 = 0.99
- `descend` = 644 / 2000 = 0.322

If the required fonts are not available on [FontSource](https://fontsource.org/), use the font files provided by the designer. Place them in `src/shared/fonts/`, but you'll need to define `@font-face` in `src/shared/fonts/index.astro` manually.

All font files are placed in `dist/fonts/` during the build.

## Deployment

In the project's deployment scripts, use `pnpm build` to build the project into `dist`.

If deploying to a server subdirectory, pass the subdirectory name to `base` option in `astro.config.js`.

The project is already set up with a GitHub Action for deploying to GitHub Pages with the ability to deploy to a project subdirectory. The action automatically passes the project name as the subdirectory name to the `base` option by calling the `getProjectRoot()` utility.

[license-url]: https://github.com/firefoxic/project-template-gulp-nunjucks/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/firefoxic/project-template-gulp-nunjucks/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/Changelog-md-limegreen
