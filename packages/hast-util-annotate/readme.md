# hast-util-annotate

[**hast**][hast] utility to annotate text nodes.

## Install

```sh
npm install @unified-doc/hast-util-annotate
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
	callbacks: Optional<Callbacks>,
): Node
```
Annotates text nodes in a tree when `annotations` are provided.  A new tree is returned.  Annotated text nodes are replaced with styled span nodes split on the matched text.

The following scenarios show how text node and annotation offsets are matched and split.  `L`, `R` denotes the left and right parts of the unmatched text while `M` denotes the matched text that will be annotated as a styled span node.  Note that annotation offsets are defined relative to the *source* content.

```
The following scenarios:
  ----   | -------- | -------- | ----     |     ---- |
-------- |   ----   | -------- |   ------ | ------   |

will yield the corresponding valid matches:
LLMMMMRR | LLMMMMRR | MMMMMMMM | LLMMRRRR | LLLLMMRR |
```

The `annotation.classNames` is applied on the matched span node and can be styled with provided or custom CSS.  If `callbacks` are provided, apply the provided `onClickAnnotation` and `onHoverAnnotation` callbacks to capture the annotation object and mouse event.

### Types

```ts
interface Annotation {
	[key: string]: any; // Additional annotation data
	startOffset: number;
	endOffset: number;
	classNames?: string[];
}

type Callback = (annotation: Annotation, event: MouseEvent) => void;

interface Callbacks {
	onClickAnnotation: Callback;
	onHoverAnnotation: Callback;
}
```

<!-- Definition -->
[hast]: https://github.com/syntax-tree/hast

<!-- Unfortunate hack to make importing gatsby in mdx work... -->
export default ({ children }) => children
