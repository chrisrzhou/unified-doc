import visit from 'unist-util-visit-parents';
import { v4 as uuidv4 } from 'uuid';

import { getAnnotatedNodes } from './get-annotated-nodes';
import { validateAnnotations } from './validate-annotations';

/**
 * Annotation algorithm
 */
export default function annotate(tree, annotations, annotationCallbacks = {}) {
	const sortedAnnotations = validateAnnotations(annotations);
	const allAnnotations = sortedAnnotations.reduce(
		(map, annotation) => ({
			...map,
			[annotation.id]: annotation,
		}),
		{},
	);
	const allNodes = {};
	const a2n = {};
	const n2a = {};

	visit(tree, 'text', (node, parents) => {
		const nodeId = uuidv4();
		const parent = parents[parents.length - 1];

		// If annotation occurs before node, continue to next.
		// If it is after, break out because there is nothing left to find.
		for (const annotation of sortedAnnotations) {
			const { id } = annotation;
			if (annotation.startOffset > node.position.end.offset) {
				break;
			} else if (annotation.endOffset < node.position.start.offset) {
				continue;
			} else {
				if (!n2a[nodeId]) {
					n2a[nodeId] = [];
				}

				if (!a2n[id]) {
					a2n[id] = [];
				}

				// Keep track of all hashmaps
				if (node.value && node.value !== '\n') {
					allAnnotations[id] = annotation;
					allNodes[nodeId] = { node, parent };
					n2a[nodeId].push(id);
					a2n[id].push(nodeId);
				}
			}
		}
	});

	Object.keys(allNodes).forEach(nodeId => {
		const { node, parent } = allNodes[nodeId];
		const siblings = parent.children;
		if (!Array.isArray(siblings)) {
			return;
		}

		const annotatedNodes = getAnnotatedNodes(node, nodeId, {
			allAnnotations,
			a2n,
			n2a,
			callbacks: annotationCallbacks,
		});

		// Reconstruct nodes under parent
		const currentNodeIndex = siblings.indexOf(node);
		parent.children = siblings
			.slice(0, currentNodeIndex)
			.concat(annotatedNodes)
			.concat(siblings.slice(currentNodeIndex + 1));
	});

	return tree;
}
