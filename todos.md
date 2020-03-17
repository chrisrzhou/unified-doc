# todos

- [ ] Resolve `// TODO` comments.
- [ ] Check if tree mutation (in `hast-util-annotate` and `hast-util-coerce-text-positions`) is bad practice when taking performance into account.
- [ ] Find a better way to address the temporary solution in `hast-util-coerce-text-positions`.
- [ ] Get review/library feedback from unified team.

## MVP
- [ ] Support multi annotations (HARD), this is a requirement because highlighting is useless without it.
- [ ] Add Renderer pattern or track refs for annotated span nodes.
- [ ] Update docs for other packages
	- [x] `processor`
	- [ ] `hast-util-annotate`
	- [x] `hast-util-extract-text-offsets`
- [ ] write custom build script
- [ ] confirm `remark-rehype` behaviors of text nodes without positions.
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
  - Content: render html/text/markdown
  - Annotations: types of annotations (controlled by CSS). Callbacks for annotations
  - Recipes:
    - Tooltips
    - Highlights
    - Bookmarks (with URL anchors)
    - Comments
    - Redline
	- Sanitize
  - Plugins: rehype-plugins, explain behaviors (e.g. TOC cannot be annotated because the data is not part of the source.)

<!-- Links -->

[unified]: https://unifiedjs.com/
