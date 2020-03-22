# hast-util-annotate

[**hast**][hast] utility to annotate text nodes.

## Install

```sh
yarn add @unified-doc/hast-util-annotate
```

## Use

```js
```

Yields:

```js
```

## API

```ts
function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: Optional<AnnotationCallbacks>,
): Node
```
Annotates text nodes in a tree when `annotations` are provided.  The original tree is *mutated*.  Annotated text nodes are replaced with styled `span` nodes split on the matched offsets.

The following scenarios show how text node and annotation offsets are matched.  `L`, `R` denotes the left and right parts of the unmatched text while `M` denotes the matched text that will be annotated as a styled `span` node.  Note that annotation offsets are defined relative to the *source* content.

```
The following scenarios:
  ----   | -------- | -------- | ----     |     ---- |
-------- |   ----   | -------- |   ------ | ------   |

will yield the corresponding valid matches:
LLMMMMRR | LLMMMMRR | MMMMMMMM | LLMMRRRR | LLLLMMRR |
```

The `annotation.className` is applied on the matched `span` node and can be styled with provided or custom CSS.  If `annotationCallbacks` are provided, apply the callbacks to capture the annotation object and mouse event.

If `annotation.anchorId` is provided, an `anchor` element will be created using the provided `anchorId` as an anchor link.  This feature easily supports implementing "bookmarkable" annotations and relies on the browser anchor link behaviors to autoscroll to the annotation in the document.

### Types

```ts
interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** If specified, will create anchor links  with provided ID value */
	anchorId?: string;
	/** CSS classname that will be appiled on text content that matches the annotation offsets */
	className?: string;
	/** End offset relative to the source content */
	endOffset: number;
	/** Start offset relative to the source content */
	startOffset: number;
}

type AnnotationCallback = (
	annotation: Annotation,
	event?: MouseEvent,
) => void

interface AnnotationCallbacks {
	clickAnnotation: AnnotationCallback;
	hoverAnnotation: AnnotationCallback;
}
```

<!-- Definition -->
[hast]: https://github.com/syntax-tree/hast

<!-- Unfortunate hack to make importing gatsby in mdx work... -->
export default ({ children }) => children
