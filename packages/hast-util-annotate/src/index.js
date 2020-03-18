import visit from 'unist-util-visit-parents';

import annotateNode from './annotate-node';
import sortAnnotations from './sort-annotations';

export default function annotate(tree, annotations, annotationCallbacks = {}) {
	const sortedAnnotations = sortAnnotations(annotations);

	visit(tree, 'text', (node, parents) => {
		const parent = parents[parents.length - 1];
		const siblings = parent.children;
		const annotatedNodes = [];

		if (!Array.isArray(siblings)) {
			return;
		}

		// Collect all offsets of valid annotations and the current sorted node.
		// If the annotation occurs before the node, continue to the next.  If
		// it is after, break out because there is nothing left to find.
		const offsetsSet = new Set();
		offsetsSet.add(node.position.start.offset);
		offsetsSet.add(node.position.end.offset);
		for (const annotation of sortedAnnotations) {
			if (annotation.startOffset > node.position.end.offset) {
				break;
			} else if (annotation.endOffset < node.position.start.offset) {
				continue;
			} else {
				offsetsSet.add(annotation.startOffset);
				offsetsSet.add(annotation.endOffset);
			}
		}

		// Create sorted segments from set of offsets to split text node on segments
		const offsets = Array.from(offsetsSet).sort((a, b) => a - b);
		const segments = [];
		for (let i = 0; i < offsets.length - 1; i++) {
			segments.push([offsets[i], offsets[i + 1]]);
		}

		segments.forEach(([startOffset, endOffset]) => {
			if (typeof node.value !== 'string') {
				return;
			}

			let nodeData;
			const value = node.value.slice(
				startOffset - node.position.start.offset,
				endOffset - node.position.start.offset,
			);
			if (value) {
				nodeData = {
					endOffset,
					startOffset,
					value,
					annotations: [],
				};
				// Track annotations that overalp with the node
				for (const annotation of sortedAnnotations) {
					if (
						(annotation.endOffset > nodeData.startOffset &&
							annotation.startOffset < nodeData.endOffset) ||
						(annotation.startOffset < nodeData.endOffset &&
							annotation.endOffset > nodeData.startOffset)
					) {
						nodeData.annotations.push(annotation);
					}
				}
			}

			// Create annotated hast nodes: nest annotated spans based on annotations
			// in nodeData, otherwise create a text node.
			if (nodeData) {
				annotatedNodes.push(annotateNode(nodeData, annotationCallbacks));
			}
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
