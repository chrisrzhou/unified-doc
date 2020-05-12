# TODOs

- [ ] `mark` and whitespace text nodes may not always be valid child elements (e.g. invalid with `tr`, `tbody`).  May need to consider using `span` (not-ideal), or potentially ignore the React DOM nesting errors.
- [ ] `data-end` attribute does not seem to be 100% accurate when HTML tagnames are the annotated end nodes.  Debug the logic.
- [ ] Cypress tests for `react-unified-doc`.
- [ ] Jest tests for
	- `hast-util-annotate`: `get-annotated-nodes.js`
	- `react-unified-doc`: `select-text.js`
- [ ] Resolve XO/TS suppressed lint errors, and TODO comments
- [ ] Improve Typescript typings.
- [ ] Export useful annotation utilities for `react-unified-doc`.
- [ ] Review/feedback from [unified][unified] community.
