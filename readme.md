# unified-doc

[unified][unified] document renderer for content.

## TODO

- [ ] Finish features in `hast-util-annotate`
	- [ ] anchors/permalinks
- [ ] Finish features in `react-unified-doc`
	- [ ] Support `text` format.
  -[x] Support for `rangy` selections and applying new annotations.
  -[x] Render different types of annotations (highlights, redlines, strikethroughs).
  -[x] Click/hover on existing annotations.
- [ ] Add Tests for `hast-util-annotate` and `rehype-annotate`
- [ ] Type all packages with `ts`
- [ ] Update docs for packages (`hast-util-annotate`, `rehype-annotate`)
- [ ] Comprehensive docs for `react-unified-doc`
  - Overview of goals
		- Explain motivations (unified renderer for content with annotation support based on offsets against the original content).
    - unified renderer for any document that can be mapped to `hast`
    - Focus on representing content in a `hast` without losing positional information.
    - Annotations support variety of types (tooltips, highlights, redlines, strikes) with a common and simple interface (CSS-based).
    - Hover/Click actions and selecting/adding new annotations is made easy (a difficult problem).
    - Document renderer is based on source content + offsets, and works with annotating text nodes.
    - The annotation algorithm here preserves the original offsets.
  - Props
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
