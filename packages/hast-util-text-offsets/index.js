import h from 'hastscript';
import visit from 'unist-util-visit';

export default function wrapper(tree, options) {
	const textOffsets = [];
	let textStartOffset = 0;
	visit(tree, 'text', node => {
		const { position, value } = node;
		if (position) {
		textOffsets.push({
			startOffset: textStartOffset,
			endOffset: (textStartOffset += value.length),
			position,
		});
	}
	});
	options.extractTextOffsets(textOffsets);
	return tree;
}

// Export default function wrapper(hast, options) {
// 	let textStartOffset = 0;
// 	const newHast = map(hast, node => {
// 		const { position, type, value } = node;
// 		if (type !== 'text') {
// 			return node;
// 		}

// 		const sourceStartOffset = position ? position.start.offset : 0; // Some text nodes (e.g.) do not have positions/offsets
// 		const offsets = [textStartOffset, sourceStartOffset].join('-');
// 		textStartOffset += value.length;
// 		return h('span', { [options.dataOffsetAttribute || 'data-offsets' ]: offsets }, node);
// 	});

// 	return newHast;
// }
