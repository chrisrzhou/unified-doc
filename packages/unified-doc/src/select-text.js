import { v4 as uuidv4 } from 'uuid';
import extractTextOffsets from './utils/extract-text-offsets';

export default function selectText(element, tree) {
	const selection = window.getSelection();
	const selectedTextOffset = getSelectedTextOffset(element, selection);
	const textOffsets = extractTextOffsets(tree);

	if (
		selectedTextOffset &&
		selectedTextOffset.endOffset > selectedTextOffset.startOffset
	) {
		const selectedTextOffsets = textOffsets.filter(
			({ startOffset, endOffset, position, isNewline }) => {
				return (
					position &&
					selectedTextOffset.startOffset <= endOffset &&
					selectedTextOffset.endOffset >= startOffset &&
					!isNewline // TODO: this is hacky but works for markdown
				);
			},
		);

		const firstSelectedTextOffset = selectedTextOffsets[0];
		const lastSelectedTextOffset =
			selectedTextOffsets[selectedTextOffsets.length - 1];

		const startOffset =
			firstSelectedTextOffset.position.start.offset +
			(selectedTextOffset.startOffset - firstSelectedTextOffset.startOffset);

		let endOffset;
		if (selectedTextOffsets.length === 1) {
			endOffset =
				startOffset +
				(selectedTextOffset.endOffset - selectedTextOffset.startOffset);
		} else {
			endOffset =
				lastSelectedTextOffset.position.start.offset +
				(selectedTextOffset.endOffset - lastSelectedTextOffset.startOffset);
		}

		const value = element.textContent.slice(
			selectedTextOffset.startOffset,
			selectedTextOffset.endOffset,
		);

		selection.removeAllRanges();

		return {
			id: uuidv4(),
			startOffset,
			endOffset,
			value,
		};
	}
}

// Based on https://stackoverflow.com/a/54352392
function getSelectedTextOffset(refNode, selection) {
	if (!selection) {
		return null;
	}

	if (
		selection.rangeCount > 0 &&
		refNode.contains(selection.anchorNode) &&
		refNode.contains(selection.focusNode)
	) {
		const range = selection.getRangeAt(0);
		const startOffset = getTextLength(
			refNode,
			range.startContainer,
			range.startOffset,
		);
		const endOffset = getTextLength(
			refNode,
			range.endContainer,
			range.endOffset,
		);
		return {
			startOffset,
			endOffset,
		};
	}

	return null;
}

function getNodeOffset(node) {
	if (node === null) {
		return -1;
	}

	return getNodeOffset(node.previousSibling) + 1;
}

function getTextLength(parent, node, offset) {
	const { childNodes, nodeName, parentNode } = node;

	let textLength = 0;
	if (nodeName === '#text') {
		textLength += offset;
	} else {
		for (let i = 0; i < offset; i++) {
			textLength += getNodeTextLength(childNodes[i]);
		}
	}

	if (node !== parent) {
		textLength += getTextLength(parent, parentNode, getNodeOffset(node));
	}

	return textLength;
}

function getNodeTextLength(node) {
	const { childNodes, nodeName, nodeValue } = node;

	let textLength = 0;
	if (nodeName === '#text') {
		textLength = nodeValue.length;
	} else if (childNodes !== null) {
		childNodes.forEach((childNode) => {
			textLength += getNodeTextLength(childNode);
		});
	}

	return textLength;
}
