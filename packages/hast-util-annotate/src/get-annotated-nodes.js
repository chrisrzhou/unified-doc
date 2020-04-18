import h from 'hastscript';

export default function getAnnotatedNodes(node, nodeId, annotationData) {
	const { allAnnotations, a2n, n2a, callbacks } = annotationData;
	const nodeAnnotations = (n2a[nodeId] || []).map(
		(annotationId) => allAnnotations[annotationId],
	);

	// Generate all possible sorted node segments for text node + annotations
	const offsetsSet = new Set();
	offsetsSet.add(node.position.start.offset);
	offsetsSet.add(node.position.end.offset);
	nodeAnnotations.forEach((nodeAnnotation) => {
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
			nodeAnnotations.forEach((nodeAnnotation) => {
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
	nodeSegments.forEach((nodeSegment) => {
		const { annotations, value } = nodeSegment;
		const node = { type: 'text', value };

		if (annotations.length === 0 || value === '\n') {
			annotatedNodes.push(node);
		} else {
			let annotatedNode = node;
			const { onClick, onMouseEnter, onMouseOut } = callbacks;
			annotations
				.slice()
				.reverse() // Create inner nodes first
				.forEach((annotation) => {
					const { id: annotationId, classNames, label, style } = annotation;

					const properties = {
						className: classNames,
						dataId: annotationId,
						label,
						style,
						onClick: (event) => onClick(annotation, event),
						onMouseEnter: (event) => onMouseEnter(annotation, event),
						onMouseOut: (event) => onMouseOut(annotation, event),
					};

					const annotationNodes = a2n[annotationId];
					const annotationNodeIndex = annotationNodes.indexOf(nodeId);
					const annotationNodeId = `${nodeId}-${annotationId}`;
					if (!visited[annotationNodeId]) {
						visited[annotationNodeId] = true;
						if (annotationNodeIndex === 0) {
							properties.dataStart = true;
							properties.id = annotationId; // Assign ID attribute only to the first annotated node to ensure uniqueness of IDs in the marked document nodes.
						}
					}

					if (annotationNodeIndex === annotationNodes.length - 1) {
						properties.dataEnd = true;
					}

					annotatedNode = h('mark', properties, annotatedNode);
				});

			annotatedNodes.push(annotatedNode);
		}
	});
	return annotatedNodes;
}
