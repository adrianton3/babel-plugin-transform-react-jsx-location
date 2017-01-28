'use strict'

const attributeName = 'data-source'

module.exports = ({ types: t }) => {
	function makeAttribute (fileName, lineNumber) {
		return t.jSXAttribute(
			t.jSXIdentifier(attributeName),
			t.stringLiteral(`${fileName}:${lineNumber}`)
		)
	}

	return {
		visitor: {
			JSXOpeningElement (path, state) {
				const { attributes, loc } = path.container.openingElement

				if (!loc) { return }

				attributes.push(
					makeAttribute(
						state.file.opts.filename,
						loc.start.line
					)
				)
			}
		}
	}
}