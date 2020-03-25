import h from 'hastscript';

export default function getAnnotatedNodes(node, nodeId, annotationData) {
	const { allAnnotations, a2n, n2a, callbacks } = annotationData;
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

	const visited = {};
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
					const {
						id: annotationId,
						anchor,
						classNames,
						label,
						style,
					} = annotation;

					const properties = {
						className: classNames,
						label,
						style,
						onClick: e => clickAnnotation(annotation, e),
						onMouseEnter: e => hoverAnnotation(annotation, e),
					};

					const annotationNodes = a2n[annotationId];
					const annotationNodeIndex = annotationNodes.indexOf(nodeId);
					const annotationNodeId = `${nodeId}-${annotationId}`;
					if (!visited[annotationNodeId]) {
						visited[annotationNodeId] = true;
						if (annotationNodeIndex === 0) {
							properties.dataStart = true;
						}
					}

					if (annotation.endOffset === nodeSegment.endOffset) {
						properties.dataEnd = true;
					}

					if (anchor) {
						annotatedNode = h(
							'a',
							{
								id: annotationId,
								href: `#${annotationId}`,
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
