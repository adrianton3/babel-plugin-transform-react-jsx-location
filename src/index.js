'use strict'

module.exports = ({ types: t }) => {
	function makeAttribute (fileName, lineNumber, attributeName='source') {
		return t.jSXAttribute(
			t.jSXIdentifier(`data-${attributeName}`),
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
				const defaultExclude = ['Fragment']
				const tagsToExclude = Array.isArray(state.opts.exclude)
					? [...state.opts.exclude, ...defaultExclude]
					: defaultExclude

                const { attributes, loc, name } = path.container.openingElement

				if (!loc || tagsToExclude.includes(name.name)) { return }

				attributes.push(
					makeAttribute(
						resolveFilename(state.file.opts, state.opts),
						loc.start.line,
						state.opts.attributeName
					)
				)
			}
		}
	}
}