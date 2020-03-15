# todos


- [ ] Update docs for other packages
	- [ ] `processor`
	- [ ] `hast-util-annotate`
	- [x] `hast-util-extract-text-offsets`
- [ ] write custom build script
- [ ] confirm `remark-rehype` behaviors of text nodes without positions.
- [ ] Comprehensive docs and interactive examples for `react-unified-doc`
  - Overview of goals
		- Explain motivations (unified renderer for content with annotation support based on offsets against the original content).
    - unified renderer for any document that can be mapped to `hast`
    - Focus on representing content in a `hast` without losing positional information.
    - Annotations support variety of types (tooltips, highlights, redlining, strikes) with a common and simple interface (CSS-based).
    - Hover/Click actions and selecting/adding new annotations is made easy (a difficult problem).
    - Document renderer is based on source content + offsets, and works with annotating text nodes.
    - The annotation algorithm here preserves the original offsets.
  - [x] Props
  - Content: render html/text/markdown
  - Annotations: types of annotations (controlled by CSS). Callbacks for annotations
  - Recipes:
    - Tooltips
    - Highlights
    - Bookmarks (with URL anchors)
    - Comments
    - Redline
  - Plugins: rehype-plugins, explain behaviors (e.g. TOC cannot be annotated because the data is not part of the source.)

<!-- Links -->

[unified]: https://unifiedjs.com/
