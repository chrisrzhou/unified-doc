# hast-util-extract-text-offsets
[**hast**][hast] utility to extract text-based offsets and unist positions of text nodes.


## Install
```sh
yarn add @unified-doc/hast-util-extract-text-offsets
```


## Description
This utility goes through all text nodes in a [hast][hast] tree and extracts text offsets into a provided extractor callback.

A `TextOffset` contains the following positional information:
- `position`: the [unist position][position] of the text node.
- `startOffset`: The offset of the text node's string content relative to the tree's string content.
- `endOffset`: The offset of the text node's string content relative to the tree's string content.
- `isNewline`: if the text content is a newline character.

The terms and concepts above are better presented with the following example:

```js
const content = '<blockquote>this is a blockquote with <b>bold</bold> text';
const tree = {
	type: 'root',
	children: [
		type: 'element',
		tagName: 'blockquote',
		position: Position1,
		children: [
			{
				type: 'text',
				position: Position2,
				value: 'this is a blockquote with ',
			},
			{
				type: 'element',
				tagName: 'b',
				position: Position3,
				children: [
					{
						type: 'text',
						value: 'bold',
						position: Position4,
					},
				]
			},
			{
				type: 'text',
				value: ' text',
				position: Position5,
			}
		]
	]
}
const stringifiedTree = 'this is a blockquote with bold text';

// startOffset and endOffset of text offsets are calculated against stringifiedTree
const extractedTextOffsets = [
	{
		// 'this is a blockquote with '
		startOffset: 0,
		endOffset: 25,
		position: Position1,
	},
	{
		// 'bold'
		startOffset: 25,
		endOffset: 28,
		position: Position4,
	},
	{
		// 'text'
		startOffset: 28,
		endOffset: 31,
		position: Position5,
	},
]
```


## Use
```js
import extractTextOffsets from 'hast-util-extract-text-offsets';

const tree = {
	type: 'element',
	tagName: 'div',
	children: [
		{
			type: 'element',
			tagName: 'h1',
			children: [
				{
					type: 'text',
					position: 'MockUnistPosition1',
					value: 'h1',
				},
			],
		},
		{
			type: 'element',
			tagName: 'div',
			children: [
				{
					type: 'text',
					position: 'MockUnistPosition2',
					value: 'div',
				},
				{
					type: 'element',
					tagName: 'a',
					children: [
						{
							type: 'text',
							position: 'MockUnistPosition3',
							value: 'a',
						},
					],
				},
			],
		},
		{
			type: 'element',
			tagName: 'h2',
			children: [
				{
					type: 'text',
					value: 'h2',
				},
			],
		},
	],
};

function extractor(textOffsets) {
	console.log(textOffsets);
}

extractTextOffsets(tree, extractor);
```

Yields:

```js
[
	{
		"startOffset": 0,
		"endOffset": 2,  // 0 + 'h1'.length
		"position": "MockUnistPosition1",
	},
	{
		"startOffset": 2,  // previous text endOffset
		"endOffset": 5,  // 2 + 'div'.length
		"position": "MockUnistPosition2",
	},
	{
		"startOffset": 5,  // previous text endOffset
		"endOffset": 6,  // 5 + 'a'.length
		"position": "MockUnistPosition3",
	}
	// Text node with value 'h2' is not extracted because it does not have a source unist position
];
```


## API
```ts
function textOffsets(tree: Node, extractor: Extractor): Node;
```
Extracts and captures an array of `TextOffset` with an `Extractor` callback.  Returns the original unmodified tree.


### Types
```ts
import { Position } from 'unist';

interface TextOffset {
	startOffset: number;
	endOffset: number;
	position: Position;
	isNewline?: boolean;
}

type Extractor = (textOffsets: TextOffset[]) => void;
```

<!-- Links -->
[hast]: https://github.com/syntax-tree/hast
[position]: https://github.com/syntax-tree/unist#position

<!-- Hack to make importing mdx work in docz/gatsby... -->
export default ({ children }) => children
