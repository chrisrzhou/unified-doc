import h from 'hastscript';
import map from 'unist-util-map';

export function getTextSegments(node, highlight) {
	const { position, value } = node;
	if (!position || !value) {
		return null;
	}

	const positionStartOffset = position.start.offset;
	const positionEndOffset = position.end.offset;
	const matchStartOffset = Math.max(positionStartOffset, highlight.startOffset);
	const matchEndOffset = Math.min(positionEndOffset, highlight.endOffset);
	if (matchEndOffset <= matchStartOffset) {
		return null;
	}

	const startIndex = matchStartOffset - positionStartOffset;
	const endIndex = matchEndOffset - positionStartOffset;
	const leftText = value.slice(0, startIndex);
	const matchedText = value.slice(startIndex, endIndex);
	const rightText = value.slice(endIndex);
	return [leftText, matchedText, rightText];
}

export default function wrapper(hast, options) {
	if (options.highlights.length === 0) {
		return hast;
	}

	let textStartOffset = 0;
	const highlighted = map(hast, node => {
		if (node.type !== 'text') {
			return node;
		}

		const {
			highlightClassName,
			highlights,
			onClickHighlight,
			onMouseOverHighlight,
		} = options;

		let highlightedNode = node;
		highlights.forEach(highlight => {
			const textSegments = getTextSegments(node, highlight);
			if (textSegments) {
				const [leftText, matchedText, rightText] = textSegments;
				if (matchedText) {
					function onclick(e) {
						onClickHighlight && onClickHighlight(e, { highlight });
					}

					function onmouseover(e) {
						onMouseOverHighlight && onMouseOverHighlight(e, highlight);
					}

					highlightedNode = h('span', [
						leftText,
						h(
							'span',
							{
								class: [highlightClassName, highlight.class],
								style: highlight.style,
								onclick,
								onmouseover,
								'data-text-start-offset': textStartOffset,
								'data-text-end-offset': (textStartOffset += node.value.length),
							},
							[matchedText],
						),
						rightText,
					]);
				}
			}
		});
		return highlightedNode;
	});

	return highlighted;
}
