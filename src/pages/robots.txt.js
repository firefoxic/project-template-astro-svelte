let robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL(`sitemap-index.xml`, import.meta.env.SITE).href}
`.trim()

/**
 * Handles the GET request for the robots.txt file.
 *
 * @return {Response} A response object with the robots.txt content and appropriate headers.
 */
export function GET () {
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': `text/plain; charset=utf-8`,
		},
	})
}
