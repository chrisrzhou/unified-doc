# TODOs

## `unified-doc-react`

- [ ] `mark` and whitespace text nodes may not always be valid child elements (e.g. invalid with `tr`, `tbody`). May need to consider using `span` (not-ideal), or potentially ignore the React DOM nesting errors.
- [ ] `data-annotation-end` attribute does not seem to be 100% accurate when HTML tagnames are the annotated end nodes. Debug the logic.

## Others

- [ ] Elaborate on the goals of `unified-doc` package
  - Common features when working with document (annotations/highlight, selecting text, searching, saving/reading files).
  - Add utilities for reading `File/Blob` into `createProcessor`
  - Work on saving the annotated document as a HTML document.
- [ ] Update all docs and homepage
- [ ] Set up `vue` and `vanilla` renderers/examples
- [ ] General Cypress tests for renderers
- [ ] Jest tests for - `unified-doc-util-annotate`: `get-annotated-nodes.js` - `unified-doc-react`: `select-text.js`
- [ ] Resolve XO/TS suppressed lint errors, and TODO comments
