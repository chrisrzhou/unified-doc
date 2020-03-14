# hast-util-extract-text-offsets

[**hast**][hast] utility to extract text-based offsets and unist positions of text nodes.

## Install

```sh
npm install @unified-doc/hast-util-extract-text-offsets
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
	// text node with value 'h2' is not extracted because it does not have a source unist position
];
```

## API

```ts
function textOffsets(tree: Node, extractor: Extractor): Node;
```
From an input tree, extract an array of `TextOffset` with an `Extractor` callback.  Returns the original unmodified tree.

A `TextOffset` provides text-based offsets and positional data from the original text `Node`.  Text-based offsets are calculated against the original root node that is collapsed to a single string representation.  Note that only text nodes with defined `position` are extracted.

### Types

```ts
interface TextOffset {
	startOffset: number;
	endOffset: number;
	position: Position;
}

type Extractor = (textOffsets: TextOffset[]) => void;
```

<!-- Definition -->
[hast]: https://github.com/syntax-tree/hast

<!-- Unfortunate hack to make importing gatsby in mdx work... -->
export default ({ children }) => children
