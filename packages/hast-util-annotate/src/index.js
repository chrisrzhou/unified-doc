import h from 'hastscript';
import map from 'unist-util-map';

import splitText from './split-text';

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
					// Handle anchors
					const { anchorId, classNames } = annotation;
					let tagName = 'span';
					let properties = {};
					if (anchorId) {
						tagName = 'a';
						properties = {
							id: anchorId,
							href: `#${anchorId}`,
						};
					}

					annotatedNode = h('span', [
						leftText,
						h(
							tagName,
							{
								...properties,
								class: classNames,
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
