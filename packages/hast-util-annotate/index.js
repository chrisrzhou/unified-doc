import h from 'hastscript';
import map from 'unist-util-map';

export function getTextSegments(node, annotation) {
	const { position, value } = node;
	if (!position || !value) {
		return null;
	}

	const positionStartOffset = position.start.offset;
	const positionEndOffset = position.end.offset;
	const matchStartOffset = Math.max(
		positionStartOffset,
		annotation.startOffset,
	);
	const matchEndOffset = Math.min(positionEndOffset, annotation.endOffset);
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
	const annotated = map(hast, node => {
		if (node.type !== 'text') {
			return node;
		}

		const { annotations, callbacks } = options;
		const { onClickAnnotation, onHoverAnnotation } = callbacks;

		let annotatedNode = node;
		annotations.forEach(annotation => {
			const textSegments = getTextSegments(node, annotation);
			if (textSegments) {
				const [leftText, matchedText, rightText] = textSegments;
				if (matchedText) {
					function onclick(e) {
						onClickAnnotation && onClickAnnotation(annotation, e);
					}

					function onmouseover(e) {
						onHoverAnnotation && onHoverAnnotation(annotation, e);
					}

					annotatedNode = h('span', [
						leftText,
						h(
							'span',
							{
								class: annotation.classNames,
								onclick,
								onmouseover,
							},
							[matchedText],
						),
						rightText,
					]);
				}
			}
		});
		return annotatedNode;
	});

	return annotated;
}
