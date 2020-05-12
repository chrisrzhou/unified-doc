import React, { createElement, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';
import tippy, { followCursor } from 'tippy.js';
import { createProcessor, selectText } from 'unified-doc';

let tooltip;

export default function Document({
	annotations = [],
	className,
	content,
	contentType,
	rehypePlugins = [],
	sanitizeSchema = {},
	getAnnotationTooltip,
	onAnnotationClick,
	onAnnotationMouseEnter,
	onAnnotationMouseLeave,
	onSelectText,
}) {
	const docRef = useRef();

	// Set up unified processor to compile content
	function onClick(annotation, event) {
		if (onAnnotationClick) {
			event.stopPropagation();
			onAnnotationClick(annotation, event);
		}
	}

	function onMouseEnter(annotation, event) {
		if (onAnnotationMouseEnter) {
			event.stopPropagation();
			onAnnotationMouseEnter(annotation, event);
		}

		if (getAnnotationTooltip) {
			tooltip = tippy(event.target, {
				arrow: false,
				followCursor: 'horizontal',
				plugins: [followCursor],
			});
			// @ts-ignore TODO: fix type
			tooltip.setContent(getAnnotationTooltip(annotation));
			// @ts-ignore TODO: fix type
			tooltip.show();
		}
	}

	function onMouseOut(annotation, event) {
		if (onAnnotationMouseLeave) {
			event.stopPropagation();
			onAnnotationMouseLeave(annotation, event);
		}

		if (tooltip) {
			event.stopPropagation();
			tooltip.destroy();
			tooltip = null;
		}
	}

	const annotationCallbacks = {
		onClick,
		onMouseEnter,
		onMouseOut,
	};

	const processor = createProcessor({
		annotations,
		annotationCallbacks,
		contentType,
		rehypePlugins,
		sanitizeSchema,
	});
	processor.use(rehype2react, { createElement });

	useEffect(() => {
		function handleSelectText(event) {
			if (onSelectText) {
				const selectedText = selectText(
					docRef.current,
					processor.parse(content),
				);
				if (selectedText) {
					onSelectText(selectedText, event);
				}
			}
		}

		window.addEventListener('mouseup', handleSelectText);

		return () => {
			window.removeEventListener('mouseup', handleSelectText);
		};
	}, [content, processor, onSelectText]);

	return (
		<div ref={docRef} className={className}>
			{processor.processSync(content).contents}
		</div>
	);
}
