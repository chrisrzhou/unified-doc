import visit from 'unist-util-visit-parents';

import splitText from './split-text';

export default function annotate(tree, annotations, annotationCallbacks = {}) {
	const { onClickAnnotation, onHoverAnnotation } = annotationCallbacks;

	visit(tree, 'text', (node, parents) => {
		const parent = parents[parents.length - 1];
		const siblings = parent.children;
		// @ts-ignore: TODO ts unknown type
		const currentNodeIndex = siblings.indexOf(node);
		let nodes = [node];

		// Annotate node codea
		annotations.forEach(annotation => {
			const textSegments = splitText(node, annotation);
			if (textSegments) {
				const [leftText, matchedText, rightText] = textSegments;
				if (matchedText) {
					// Handle anchors
					const { anchorId, classNames } = annotation;
					let tagName = 'span';
					const properties = {
						class: classNames,
						onclick: e => onClickAnnotation && onClickAnnotation(annotation, e),
						onmouseover: e =>
							onClickAnnotation && onHoverAnnotation(annotation, e),
					};
					if (anchorId) {
						tagName = 'a';
						properties.id = anchorId;
						properties.href = `#${anchorId}`;
					}

					nodes = [];
					if (leftText) {
						nodes.push({ type: 'text', value: leftText });
					}

					nodes.push({
						type: 'element',
						tagName,
						properties,
						children: [
							{
								type: 'text',
								value: matchedText,
							},
						],
					});

					if (rightText) {
						nodes.push({ type: 'text', value: rightText });
					}
				}
			}
		});

		parent.children = siblings
			// @ts-ignore: TODO ts unknown type
			.slice(0, currentNodeIndex)
			.concat(nodes)
			// @ts-ignore: TODO ts unknown type
			.concat(siblings.slice(currentNodeIndex + 1));
	});

	return tree;
}
