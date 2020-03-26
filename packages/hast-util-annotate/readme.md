# hast-util-annotate

[**hast**][hast] utility to annotate text nodes.

## Install

```sh
yarn add @unified-doc/hast-util-annotate
```

## Description
> `hast-util-annotate` is the primary engine for annotating documents in [react-unified-doc][react-unified-doc].

This utility goes through all text nodes in a [hast][hast] tree and annotates any node that overlaps with a provided array of annotations.

The annotation algorithm is focused on preserving the structure of the tree, and annotations are applied as `<mark />` tags immediately above the text nodes.  The annotation process is data-driven and declarative.  Features are supported easily (via `className`, data attributes etc) by simple specification of relevant data on the `Annotation` object.

At a high level, an `Annotation` object contains the following important information:
- `startOffset`: The start offset of the annotation relative to the source content.
- `endOffset`: The end offset of the annotation relative to the source content.
- `classNames`: Classnames to apply to the annotated text node.
- `label`, `anchor`, `style`: Other useful fields that add simple features to the annotated text nodes.  See the sections below for more details.

Annotation callbacks can be provided to this utility to support `onClick` and `onMouseEnter` events when interacting with annotated nodes.

One powerful feature of this utility is the ability to define annotations as simple start/end offsets relative to the source content, and it will correctly annotate text nodes without breaking the tree structure or downstream rendering. The example demonstrates the idea how the utility can correctly annotate offsets covering 'incomplete' nodes.

```js
const content = '<blockquote>This is a blockquote with <b>bold</b> text</blockquote>';
const annotations = [{ startOffset: 5 }, { endOffset: 43}];
const substringApplyingOffsets = '<blockquote>This is a blockquote with <b>bol'; // naively rendering this leads to broken trees
const expectedAnnotatedSubstrings = ['This is a blockquote with ', 'bol']

const actualAnnotatedNodes = { // preserves the original tree structure
	type: 'element',
	tagName: 'blockquote',
	children: [
		{
			type: 'element',
			tagName: 'mark',  // annotated
			children: [
				type: 'text',
				value: 'This is a blockquote with ',
			],
		},
		{
			type: 'element',
			tagName: 'b',
			children: [
				{
					type: 'element',
					tagName: 'mark',  // annotated
					children: [
						type: 'text',
						value: 'bol'
					],
				},
				{
					type: 'text',
					value: 'd',
				}
			]
		},
		{
			type: 'text',
			value: ' text',
		}
	]
}
```


## Use

```js
const tree = {
	type: 'root',
	children: [
		{
			type: 'text',
			value: 'a to the b to the c to the d',
			position: {
				start: {
					offset: 10,
				},
				end: {
					offset: 38,
				},
			},
		},
	],
};


const annotations = [
	{ id: 'a', startOffset: 10, endOffset: 20 },
]
const annotated = annotate(tree, annotations)
```

Yields

```js
const annotated = {
	type: 'root',
	children: [
		{
			type: 'text',
			value: 'a to the b'
		},
		{
			type: 'element',
			tagName: 'mark',
			children: [
				{
					type: 'text',
					value: ' to the c '
				},
			],
		},
		{
			type: 'text',
			value: 'to the d',
		},
	],
};
```


Note that the utility also supports annotating text nodes with multiple overlapping annotations as demonstrated in the example below.  Please check out the [react-unified-doc][react-unified-doc] docs for interactive examples of this behavior!


```js
// using same tree in the earlier example

const annotations = [
	{ id: 'a', startOffset: 10, endOffset: 20 },
	{ id: 'b', startOffset: 15, endOffset: 25 },
]
const annotated = annotate(tree, annotations);
```

Yields:

```js
const annotated = {
	type: 'root',
	children: [
		{
			type: 'text',
			value: 'a to the b', // unmatched
		},
		{
			type: 'element',
			tagName: 'mark',
			children: [
				{
					type: 'text',
					value: ' to t', // matched once
				},
			],
		},
		{
			type: 'element',
			tagName: 'mark',
			children: [
				{
					type: 'element',
					tagName: 'mark',
					children: [
						{
							type: 'text',
							value: 'he c ', // matched twice
						},
					],
				},
			],
		},
		{
			type: 'element',
			tagName: 'mark',
			children: [
				{
					type: 'text',
					value: 'to th', // matched once
				},
			],
		},
		{
			type: 'text',
			value: 'e d', // unmatched
		},
	],
};
```

## API

```ts
function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
): Node;
```

### Types

```ts
interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** Unique ID is required for annotation algorithm to work */
	id: string;
	/** Start offset relative to the source content */
	startOffset: number;
	/** End offset relative to the source content */
	endOffset: number;
	/** If provided, will create <a /> instead of <mark /> tags and use the annotation ID as the href.  Useful for creating annotation permalinks. */
	anchor?: boolean;
	/** CSS classnames that will be applied on the annotated nodes */
	classNames?: string[];
	/** If provided, will add the value to the 'label' tag attribute.  Useful for displaying the label with custom CSS:before selectors. */
	label?: string;
	/** Apply custom styles to the annotated node. Note that use of `classNames` prop is preferred. */
	style?: { [key: string]: any };
}

type AnnotationCallback = (
	annotation: Annotation,
	event?: MouseEvent,
) => void;

interface AnnotationCallbacks {
	onClick: AnnotationCallback;
	onMouseEnter: AnnotationCallback;
	onMouseOut: AnnotationCallback;
}
```

<!-- Definition -->
[hast]: https://github.com/syntax-tree/hast
[react-unified-doc]: ../react-unified-doc/readme

<!-- Hack to make importing mdx work in docz/gatsby... -->
export default ({ children }) => children
