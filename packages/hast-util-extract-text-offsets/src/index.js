import visit from 'unist-util-visit-parents';

export default function textOffsets(tree, extractor) {
	const textOffsets = [];
	let textStartOffset = 0;
	visit(tree, 'text', (node) => {
		const { position, value } = node;

		if (typeof value === 'string' && value && position) {
			const textOffset = {
				startOffset: textStartOffset,
				endOffset: (textStartOffset += value.length),
				position,
			};
			if (value === '\n') {
				textOffset.isNewline = true;
			}

			textOffsets.push(textOffset);
		}
	});
	extractor(textOffsets);

	return tree;
}
