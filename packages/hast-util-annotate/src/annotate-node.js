export default function annotateNode(nodeData, annotationCallbacks) {
	const { annotations, value } = nodeData;
	const node = { type: 'text', value };
	if (annotations.length === 0) {
		return node;
	}

	// Apply annotation in reverse order since we are creating the annotated
	// spans from inside out
	const { onClickAnnotation, onHoverAnnotation } = annotationCallbacks;
	let annotatedNode = node;
	annotations
		.slice()
		.reverse()
		.forEach(annotation => {
			const { anchorId, classNames } = annotation;
			let tagName = 'span';
			const properties = {
				class: classNames,
				onclick: e => {
					if (onClickAnnotation) {
						e.stopPropagation();
						onClickAnnotation(annotation, e);
					}
				},
				onmouseover: e => {
					if (onHoverAnnotation) {
						e.stopPropagation();
						onHoverAnnotation(annotation, e);
					}
				},
			};
			if (anchorId) {
				tagName = 'a';
				properties.id = anchorId;
				properties.href = `#${anchorId}`;
			}

			annotatedNode = {
				type: 'element',
				tagName,
				properties,
				children: [annotatedNode],
				value: undefined,
			};
		});

	return annotatedNode;
}
