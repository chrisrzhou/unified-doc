import h from 'hastscript';
import map from 'unist-util-map';

/**
 * Take the minimum overlap of a node and annotation offset
 * The following scenarios:
 *   ----   | -------- | -------- | ----     |     ---- |
 * -------- |   ----   | -------- |   ------ | ------   |
 * will yield the corresponding valid matches:
 * LLMMMMRR | LLMMMMRR | MMMMMMMM | LLMMRRRR | LLLLMMRR |
 * Return null if no matches are found.
 **/
export function splitText(node, annotation) {
	const { position, value } = node;
	if (!position || !value) {
		return null;
	}

	const matchStartOffset = Math.max(
		position.start.offset,
		annotation.startOffset,
	);
	const matchEndOffset = Math.min(position.end.offset, annotation.endOffset);
	if (matchEndOffset <= matchStartOffset) {
		return null;
	}

	const startIndex = matchStartOffset - position.start.offset;
	const endIndex = matchEndOffset - position.start.offset;
	const leftText = value.slice(0, startIndex);
	const matchedText = value.slice(startIndex, endIndex);
	const rightText = value.slice(endIndex);

	return [leftText, matchedText, rightText];
}

export default function annotate(tree, annotations, annotationCallbacks = {}) {
	return map(tree, node => {
		if (node.type !== 'text') {
			return node;
		}

		const { onClickAnnotation, onHoverAnnotation } = annotationCallbacks;
		let annotatedNode = node;
		annotations.forEach(annotation => {
			const textSegments = splitText(node, annotation);
			if (textSegments) {
				const [leftText, matchedText, rightText] = textSegments;
				if (matchedText) {
					annotatedNode = h('span', [
						leftText,
						h(
							'span',
							{
								class: annotation.classNames,
								onclick: e =>
									onClickAnnotation && onClickAnnotation(annotation, e),
								onmouseover: e =>
									onClickAnnotation && onHoverAnnotation(annotation, e),
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
}
