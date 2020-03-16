import visit from 'unist-util-visit';

export default function textOffsets(tree, extractor) {
	const textOffsets = [];
	let textStartOffset = 0;
	visit(tree, 'text', node => {
		const { position, value } = node;
		if (position && value) {
			textOffsets.push({
				startOffset: textStartOffset,
				// @ts-ignore: TODO ts unknown type
				endOffset: (textStartOffset += value.length),
				position,
			});
		}
	});
	extractor(textOffsets);

	return tree;
}
