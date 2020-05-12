import extractTextOffsets from '.';

describe('index.js', () => {
	let textOffsets = [];
	function extractor(extractedTextOffsets) {
		textOffsets = extractedTextOffsets;
	}

	it('should extract nothing if tree empty tree', () => {
		const tree = { type: 'root' };
		extractTextOffsets(tree, extractor);
		expect(textOffsets).toEqual([]);
	});

	it('should extract text offsets for text nodes that have source unist positions', () => {
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
		extractTextOffsets(tree, extractor);
		expect(textOffsets).toEqual([
			{
				startOffset: 0,
				endOffset: 2, // 0 + 'h1'.length
				position: 'MockUnistPosition1',
			},
			{
				startOffset: 2, // Previous text endOffset
				endOffset: 5, // 2 + 'div'.length
				position: 'MockUnistPosition2',
			},
			{
				startOffset: 5, // Previous text endOffset
				endOffset: 6, // 5 + 'a'.length
				position: 'MockUnistPosition3',
			},
			// Text node with value 'h2' is not extracted because it does not have a source unist position
		]);
	});
});
