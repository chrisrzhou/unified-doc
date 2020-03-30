# 📜 unified-doc
[unified][unified] document renderer for content.

## Table of Contents
- [Motivations](#motivations)
- [Architecture](#architecture)
  - [Content](#content)
  - [Annotations](#annotations)
  - [Plugins](#plugins)
- [unified](#unified)
- [contribute](#contribute)


## Motivations

> Content as structured data. -- [unified][unified]

Knowledge is *unified abstractly* across humanity.  We all share common goals of acquiring, understanding, storing, and sharing knowledge.  Content represents the physical manifestation of storing knowledge, and it is accomplished with many digital formats in the modern computing age.

Various softwares act on content types to parse, process, and render the underlying data for human consumption.  Many solutions try to be interoperable, but are largely limited by the lack of a common interface across content types and programs.  These solutions can be largely described as API interactions between software, and not as interactions with the actual content.  The [unified][unified] initiative addresses this problem by representing content in unified syntax tress where programs can work closely with the structured content data.

`unified-doc` is a document renderer, with associated utilities, that uses the `unified` ecosystem to support a unified way to render supported content types into HTML-based markup.  It represents content as structured data, and preserves fidelity of the original source content in the rendered document, all at the same time supporting powerful features that enrich the document (e.g. annotations).  Outputting HTML markup allows interoperable ways to view and enrich the document with standard web technologies.


## Architecture

The following section covers the designs and approach of how `unified-doc` renderers and programs work.


### Content
At the time of writing, `unified-doc` supports parsing the following content types into [hast][hast] trees:

- `text`
- `markdown`
- `html`

This is done through the [`processor`][processor] module which provides a single entry point to define how supported content types are parsed into `hast` trees.  `processor` applies an opinionated (but configurable) sanitization step using the `hast-util-sanitize` utility.

Now that the source content is represented as unified `hast` tree, everything downstream can be consistently implemented.  Let's talk about compiling and rendering the `hast` tree into an actual `document`.


### Document
The term `document` refers abstractly to the output of compiling and rendering the `hast` tree.  This output should be a HTML-based markup to support accessible and intereopable ways to further enrich the document with web technologies.  `unified-doc` supports the following renderers:
- [react-unified-doc][react-unified-doc]

Renderers should use the `processor` module internally so that it can support all content types that `processor` supports.  It can optionally include [rehype][rehype] plugins depending on features to be supported.  `react-unified-doc` uses the [`hast-util-annotate`][hast-util-annotate] to support annotation features on `hast` trees processed by `processor`.


### Annotations

One of the more important and useful features when rendering documents is supporting annotations.  Here are some use cases of annotations in common document workflows:
- *Highlighting*: Text content is highlighted in the document with custom styles.  This is the broadest domain and there are various UIUX implementations to address specific workflows.
- *Bookmarking*: Loading a document with a valid anchor link will scroll to the bookmarked annotation.
- *Commenting*: Clicking on an annotation loads associated comments.
- *Redlining*: Text content is underlined, showing the difference between two versions of the document.

The term `annotation` is used loosely to refer to any *text content* that should be *marked clearly* to the user *without disrupting* the document layout.  The earlier statement is intentionally worded to emphasize the following:
- *text content*: content in the *rendered output* (not source content) that is visible/meaningful to the viewer.  For HTML-based markup, this is represented semantically by `text` nodes.
- *marked clearly*: annotated text nodes should apply visual cues indicating they are annotated or 'marked'.  For HTML-based markup, this is represented semantically by `mark` nodes.  Intended annotation styles should be applied intuitively on these `mark` nodes.
- *without disrupting*: annotations should simply be semantic additions to the document without affecting the rendered document.  As such, there should be no Javascript involved, and it should only affect primitive `text` nodes.  Custom styles applied on these nodes should never change the document layout.

Annotations should also support user interactions (e.g. clicking, hovering).  These interactions allow building useful features that enrich the document (e.g. tooltips, removing annotations, permalinks).

> Note: As mentioned earlier, it is important to view annotations as a **pure additive** step when rendering documents.  Annotation implementations should never couple the rendering of documents and annotations, and annotations should be represented as simple and declarative data to be used by the document renderer.

The above requirements and design choices are implemented in [`hast-util-annotate`][hast-util-annotate], which is a `hast` utility that powers annotation features in renderers such as [`react-unified-doc`][react-unified-doc].


### Plugins
Just as all programs and content is interoperable in the [unified][unified] ecosystem, the `unified-doc` renderers should support this with the [rehype][rehype] plugin ecosystem.  See the `react-unified-doc` [plugins docs][plugins] for an example on how this behaves.


## unified
This project is built on top of the [unified][unified] ecosystem.  Please check out all the inspirational and ambitious projects happening there and contribute towards making content/knowledge more accessible for machines and humans.


## Contribute
No formal contribution guidelines yet.  Be respectful and nice!

Useful info about the project:
- The project is linted with `xo` with some custom configuration.
- While the project uses `typescript`, it is not a `typescript` project and uses it purely to aid development.  This is intentional to make the code more accessible to the broader community.
- Tests are managed with `jest`.
- Docs are managed with `docz`.
- Todos:
	- [ ] Revisit `anchor` property in `hast-util-annotate` (nested `<a />` tags is not semantic in HTML).
  - [ ] Cypress tests for `react-unified-doc`.
  - [ ] Export useful annotation utilities for `react-unified-doc`.
  - [ ] Jest tests for `get-annotated-nodes` in `hast-util-annotate`.
  - [ ] Revisit/formalize `hast-util-coerce-text-positions`, `text-parse` implementations.
  - [ ] Add more Gallery examples in `docs`.
	- [ ] Improve Typescript typings.
	- [ ] Resolve XO/TS suppressed lint errors, and TODO comments
  - [ ] Review/feedback from [unified][unified] team.


<!-- Links -->
[hast]: https://github.com/syntax-tree/hast
[hast-util-annotate]: https://github.com/chrisrzhou/unified-doc/tree/master/packages/hast-util-annotate
[plugins]: https://unified-doc.netlify.com/react-unified-doc/plugins
[position]: https://github.com/syntax-tree/unist#position
[processor]: https://github.com/chrisrzhou/unified-doc/tree/master/packages/processor
[props]: https://unified-doc.netlify.com/react-unified-doc/props
[react]: https://github.com/facebook/react
[react-unified-doc]: https://github.com/chrisrzhou/unified-doc/tree/master/packages/react-unified-doc
[rehype]: https://github.com/rehypejs
[unified]: https://unifiedjs.com/
[unified-doc]: https://github.com/chrisrzhou/unified-doc
