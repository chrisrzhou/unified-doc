import visit from 'unist-util-visit-parents';
import { v4 as uuidv4 } from 'uuid';

import getAnnotatedNodes from './get-annotated-nodes';
import validateAnnotations from './validate-annotations';

/**
 * Annotation algorithm:
 * - Validate and sort annotations (check id, startOffset, endOffset)
 * - Visit all text nodes of the tree.
 * - Use the fact that annotations are sorted to:
 * 		- Move to next annotation if they occur before the current text node.
 * 		- Skip remaining annotations if they occur after the current text node.
 * - Keep track of various hashmaps for easy retrieval when annotations and text node overlap:
 * 		- allAnnotations: normalized map of annotations
 *		- allNodes: normalized map of text nodes (with generated uuids)
 *		- a2n: Track text node IDs associated with a given annotation ID.  Order of the text nodes is important here, and is preserved.
 *		- n2a: Track all annotations applied to a given text node.
 * - With the hashmaps, use the getAnnotatedNodes method to split the current text node into nodeSegments (text nodes + annotated span nodes).
 * 		- For the current text node, segment the node by checking all possible offset intervals using n2a hashmap.
 * 		- Keep track of relevant data for the node segment (startOffset, endOffset, annotations, value) which will be needed to construct new hast nodes.
 * 		- If nodeSegments do not contain annotations, construct a <text /> node.
 * 		- If nodeSegments contain annotations, construct a <mark />  node based on the annotation definition.  Apply annotation definitions and callbacks.  Keep track of which nodeSegments represents the start/end of the annotation
 * - With reference to the current text node, replace it with the annotated nodeSegments by splicing it in place with its siblings under its parent.
 * - Return the mutated tree.
 */
export default function annotate(tree, annotations, annotationCallbacks = {}) {
	const validatedAnnotations = validateAnnotations(annotations);
	const allAnnotations = validatedAnnotations.reduce(
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
		for (const annotation of validatedAnnotations) {
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

	Object.keys(allNodes).forEach((nodeId) => {
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
