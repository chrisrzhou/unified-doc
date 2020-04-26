// Based on https://stackoverflow.com/a/54352392
export function getSelectedTextOffset(refNode, selection) {
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
