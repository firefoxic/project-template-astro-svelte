import { cwd } from "node:process"
import { basename, dirname, extname, join, posix, relative } from "node:path"
import { readdirSync, statSync, writeFileSync } from "node:fs"

let iconsDir = join(cwd(), `src`, `shared`, `icons`)
let cssFile = join(iconsDir, `index.css`)

generateIconsCss()

/**
 * Generates CSS for all SVG icons in the `src/shared/icons` directory.
 * The CSS is written to `src/shared/icons/index.css`.
 * The function logs the list of processed SVG files to the console.
 */
function generateIconsCss () {
	let svgFiles = getAllSvgFiles(iconsDir)
	let css = generateCss(svgFiles)

	writeFileSync(cssFile, css)
}

/**
 * Recursively gets all SVG files in the specified directory.
 *
 * @param {string} dir - The directory to search for SVG files.
 * @return {Array<string>} An array of relative paths to the SVG files.
 */
function getAllSvgFiles (dir) {
	let files = readdirSync(dir)
	let svgFiles = []

	files.forEach((file) => {
		let filePath = join(dir, file)
		let stat = statSync(filePath)

		if (stat.isDirectory()) {
			svgFiles = svgFiles.concat(getAllSvgFiles(filePath))
		} else if (extname(file) === `.svg`) {
			svgFiles.push(relative(iconsDir, filePath))
		}
	})

	return svgFiles
}

/**
 * Generates CSS for all SVG files in the specified directory.
 *
 * @param {Array<string>} svgFiles - An array of relative paths to the SVG files.
 * @return {string} The CSS code for the SVG files.
 */
function generateCss (svgFiles) {
	let css = svgFiles.map((path) => {
		let posixPath = posix.normalize(path)
		let name = basename(posixPath, `.svg`)

		if (dirname(posixPath) !== `.`) {
			name = `${dirname(posixPath).split(`/`).join(`-`)}-${name}`
		}

		return `@property --Icon_shape_${name} {\n\tsyntax: "<url>";\n\tinherits: false;\n\tinitial-value: url("./${posixPath}");\n}\n`
	}).join(`\n`)

	return css
}
