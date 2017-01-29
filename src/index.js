'use strict'

const attributeName = 'data-source'

module.exports = ({ types: t }) => {
	function makeAttribute (fileName, lineNumber) {
		return t.jSXAttribute(
			t.jSXIdentifier(attributeName),
			t.stringLiteral(`${fileName}:${lineNumber}`)
		)
	}

	function resolveFilename ({ filename, sourceRoot, basename }, opts) {
		if (!filename || filename === 'unknown') {
			return 'unknown'
		}

		if (opts.filename === 'compact') {
			return basename
		}

		if (sourceRoot) {
			return filename.slice(sourceRoot.length)
		}

		return filename
	}

	return {
		visitor: {
			JSXOpeningElement (path, state) {
				const { attributes, loc } = path.container.openingElement

				if (!loc) { return }

				attributes.push(
					makeAttribute(
						resolveFilename(state.file.opts, state.opts),
						loc.start.line
					)
				)
			}
		}
	}
}