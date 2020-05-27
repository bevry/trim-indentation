/**
 * Trims the initial indentation from the input string
 */
export default function trimIndentation(input: string): string {
	const source = input.replace(/^\n+|\s+$/g, '')
	const match = source.match(/^[\x20\t]+/)
	if (!match) return source
	const indentation = match[0]
	const result = source
		.split('\n')
		.map((line) => {
			if (line.indexOf(indentation) === 0) {
				return line.substring(indentation.length)
			} else {
				throw new Error('inconsitent indentation for trimming')
			}
		})
		.join('\n')
	return result
}
