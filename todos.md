# TODOs

## `unified-doc-react`
- [ ] `mark` and whitespace text nodes may not always be valid child elements (e.g. invalid with `tr`, `tbody`).  May need to consider using `span` (not-ideal), or potentially ignore the React DOM nesting errors.
- [ ] `data-end` attribute does not seem to be 100% accurate when HTML tagnames are the annotated end nodes.  Debug the logic.

## Others
- [ ] Update all docs and homepage
- [ ] Set up `vue` and `js-` wrappers
- [ ] General Cypress tests for renderers
- [ ] Jest tests for
	- `unified-doc-util-annotate`: `get-annotated-nodes.js`
	- `unified-doc-react`: `select-text.js`
- [ ] Resolve XO/TS suppressed lint errors, and TODO comments
