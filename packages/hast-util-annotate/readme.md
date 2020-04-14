# hast-util-annotate
[hast][hast] utility to annotate text nodes.


## Install
```sh
yarn add @unified-doc/hast-util-annotate
```


## Description
> `hast-util-annotate` is the primary engine for annotating documents in [react-unified-doc][react-unified-doc].

This utility goes through all text nodes in a [hast][hast] tree and annotates text nodes that overlap with a provided array of annotations.

The annotation algorithm is focused on preserving the structure of the tree, and annotations are applied as `<mark />` tags immediately above the text nodes.  The annotation process is data-driven and declarative.  Features are supported easily by specifying simple data on the `Annotation` object.

At a high level, an `Annotation` object contains the following important information:
- `id`: unique ID to identify the annotation.  Useful for assigning unique ID to the rendered DOM element.
- `startOffset`, `endOffset`: positional string offsets relative to the source content.
- `classNames`, `style`: ways to customize the annotated nodes.
- `label`: support rendering a label above the annotated node.
- any other data that is useful for working with annotation callbacks.

One powerful feature of this utility is the ability to define annotations as simple start/end offsets relative to the source content, and the annotation algorithm will correctly annotate text nodes without breaking the tree structure or affect the document rendering. The following example demonstrates how the utility can correctly annotate offsets covering 'incomplete' nodes.

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
	/** Unique ID is required for annotation algorithm to work.  It is also used to uniquely assign ID values to generated <mark /> nodes which is convenient for selecting the element itself. */
	id: string;
	/** Start offset relative to the source content */
	startOffset: number;
	/** End offset relative to the source content */
	endOffset: number;
	/** CSS classnames that will be applied on the annotated nodes */
	classNames?: string[];
	/** If true, will add the provided value to the `label` tag attribute.  Useful for displaying the label with custom CSS:before selectors. */
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


<!-- Links -->
[hast]: https://github.com/syntax-tree/hast
[react-unified-doc]: ../react-unified-doc/readme

<!-- Hack to make importing mdx work in docz/gatsby... -->
export default ({ children }) => children
