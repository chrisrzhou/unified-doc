import h from 'hastscript';

export function getAnnotatedNodes(node, nodeId, data) {
	const { allAnnotations, a2n, n2a, callbacks } = data;
	const nodeAnnotations = (n2a[nodeId] || []).map(
		annotationId => allAnnotations[annotationId],
	);

	// Generate all possible sorted node segments for text node + annotations
	const offsetsSet = new Set();
	offsetsSet.add(node.position.start.offset);
	offsetsSet.add(node.position.end.offset);
	nodeAnnotations.forEach(nodeAnnotation => {
		offsetsSet.add(nodeAnnotation.startOffset);
		offsetsSet.add(nodeAnnotation.endOffset);
	});
	const offsets = Array.from(offsetsSet).sort((a, b) => a - b);
	const segments = [];
	for (let i = 0; i < offsets.length - 1; i++) {
		segments.push([offsets[i], offsets[i + 1]]);
	}

	// For each segment, collect relevant data to build node segments
	const nodeSegments = [];
	segments.forEach(([startOffset, endOffset]) => {
		const startIndex = startOffset - node.position.start.offset;
		const endIndex = endOffset - node.position.start.offset;
		const value = node.value.slice(startIndex, endIndex);
		if (value && startIndex >= 0 && endIndex > startIndex) {
			const nodeSegment = {
				endOffset,
				startOffset,
				value,
				annotations: [],
			};
			nodeAnnotations.forEach(nodeAnnotation => {
				if (
					(nodeAnnotation.endOffset > nodeSegment.startOffset &&
						nodeAnnotation.startOffset < nodeSegment.endOffset) ||
					(nodeAnnotation.startOffset < nodeSegment.endOffset &&
						nodeAnnotation.endOffset > nodeSegment.startOffset)
				) {
					nodeSegment.annotations.push(nodeAnnotation);
				}
			});
			nodeSegments.push(nodeSegment);
		}
	});

	// Construct annotated nodes
	const annotatedNodes = [];
	nodeSegments.forEach(nodeSegment => {
		const { annotations, value } = nodeSegment;
		const node = { type: 'text', value };

		if (annotations.length === 0 || value === '\n') {
			annotatedNodes.push(node);
		} else {
			let annotatedNode = node;
			const { clickAnnotation, hoverAnnotation } = callbacks;
			annotations
				.slice()
				.reverse() // Create inner nodes first
				.forEach(annotation => {
					const { anchor, className, id, label } = annotation;

					// TODO determine the correct logic for this
					// It should care about nodeSegment, not the whole node
					const layer = n2a[nodeId]
						.slice()
						.reverse()
						.indexOf(id);

					const properties = {
						class: className,
						label,
						onclick: e => clickAnnotation(annotation, e),
						onmouseenter: e => hoverAnnotation(annotation, e),
					};

					if (layer > 0) {
						properties.layer = layer;
					}

					const annotationNodes = a2n[id];
					const annotationNodeIndex = annotationNodes.indexOf(nodeId);
					if (annotationNodeIndex === 0) {
						properties.start = true;
					}

					if (anchor) {
						annotatedNode = h(
							'a',
							{
								id,
								href: `#${id}`,
							},
							h('mark', properties, annotatedNode),
						);
					} else {
						annotatedNode = h('mark', properties, annotatedNode);
					}
				});

			annotatedNodes.push(annotatedNode);
		}
	});
	return annotatedNodes;
}
