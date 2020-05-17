import React, { createElement, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';
import { createProcessor, selectText } from 'unified-doc';

export default function Document({
	annotations = [],
	annotationCallbacks = {},
	className,
	content,
	contentType,
	rehypePlugins = [],
	sanitizeSchema = {},
	onSelectText,
}) {
	const docRef = useRef();

	// Set up unified processor to compile content
	const processor = createProcessor({
		annotations,
		annotationCallbacks,
		contentType,
		rehypePlugins,
		sanitizeSchema,
	});
	processor.use(rehype2react, { createElement });
	const tree = processor.parse(content);
	// @ts-ignore: TODO remove when VFile typings are fixed
	const compiled = processor.processSync(content).result;

	// Setup text selection
	useEffect(() => {
		function handleSelectText(event) {
			if (onSelectText) {
				const selectedText = selectText(docRef.current, tree);
				if (selectedText) {
					onSelectText(selectedText, event);
				}
			}
		}

		document.addEventListener('mouseup', handleSelectText);

		return () => {
			document.removeEventListener('mouseup', handleSelectText);
		};
	}, [content, tree, onSelectText]);

	return (
		<div ref={docRef} className={className}>
			{compiled}
		</div>
	);
}
