import visit from 'unist-util-visit-parents';

import sortAnnotations from './sort-annotations';
import splitTextNode from './split-text-node';

/**
 * Annotation algorithm
 * - Visit every text node in the tree.
 * - Identify the currentNodeIndex relative to the parent.
 * - For each text node, loop over sorted (for performance) annotations and continuously split nodes.
 * - Gather nodes and create a new annotated node for the currentNodeIndex
 * - Update all nodes under the parent.
 */
export default function annotate(tree, annotations, annotationCallbacks = {}) {
	const { onClickAnnotation, onHoverAnnotation } = annotationCallbacks;
	const sortedAnnotations = sortAnnotations(annotations);

	visit(tree, 'text', (node, parents) => {
		const parent = parents[parents.length - 1];
		const siblings = parent.children;

		if (!Array.isArray(siblings)) {
			return;
		}

		const currentNodeIndex = siblings.indexOf(node);
		let nodes = [node];

		sortedAnnotations.forEach(annotation => {
			const textSegments = splitTextNode(node, annotation);
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

		// Reconstruct nodes under parent
		parent.children = siblings
			.slice(0, currentNodeIndex)
			.concat(nodes)
			.concat(siblings.slice(currentNodeIndex + 1));
	});

	return tree;
}
