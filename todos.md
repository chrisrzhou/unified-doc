# todos

- [ ] Build packages
- [ ] Resolve `// TODO` comments.
- [ ] Check if tree mutation (in `hast-util-annotate` and `hast-util-coerce-text-positions`) is bad practice when taking performance into account.
- [ ] Find a better way to address the temporary hacks for markdown in `hast-util-coerce-text-positions` and using `isNewline`
- [ ] Provide a callback to capture annotated nodes (refs).
- [ ] Get review/library feedback from unified team.
- [ ] Export various annotation utilities.

## MVP
- [x] `Layout` example should support highlighting text in source content.  Account for responsive screens.
- [x] Debug start/end (especially end) of annotations
- [ ] Randomize annotations
- [ ] find/search text with Rangy's `findText`: https://github.com/timdown/rangy/wiki/Text-Range-Module#findtextmixed-searchterm-object-options
- [x] Update docs for other packages
- [ ] Add gallery
	- Kindle (x-ray, bookmarks, notes)
	- Tooltips
	- Highlights
	- Bookmarks (with URL anchors)
	- Comments
	- Redline
- [ ] Build a badass homepage
- [ ] Comprehensive docs and interactive examples for `react-unified-doc`
  - Overview of goals
		- Explain motivations (unified renderer for content with annotation support based on offsets against the original content).
		- this renderer is DOM-based (not canvas-based), is simple, and driven by content and offsets, and relies very little on custom logic to render/manage annotations.
    - unified renderer for any document that can be mapped to `hast`
    - Focus on representing content in a `hast` without losing positional information.
    - Annotations support variety of types (tooltips, highlights, redlining, strikes) with a common and simple interface (CSS-based).
    - Hover/Click actions and selecting/adding new annotations is made easy (a difficult problem).
    - Document renderer is based on source content + offsets, and works with annotating text nodes.
    - The annotation algorithm here preserves the original offsets.
	- Explain architecture/mechanisms on how everything works.

<!-- Links -->
[unified]: https://unifiedjs.com/
