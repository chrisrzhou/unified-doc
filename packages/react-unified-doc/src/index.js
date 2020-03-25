import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
import { createProcessor } from '@unified-doc/processor';
import rangy from 'rangy';
import React, { createElement, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';
import tippy, { followCursor } from 'tippy.js';

import 'tippy.js/dist/tippy.css';

const createPlugin = transform => (...args) => tree => transform(tree, ...args);

const annotate = createPlugin(annotateUtil);
const extractTextOffsets = createPlugin(extractTextOffsetsUtil);

let tooltip;

export default function ReactUnifiedDocument({
	annotations = [],
	content,
	contentType,
	getAnnotationTooltip,
	onAnnotationClick,
	onAnnotationHover,
	onSelectText,
	rehypePlugins = [],
	sanitizeSchema = {},
}) {
	const docRef = useRef();
	const textOffsetsRef = useRef();

	useEffect(() => {
		function handleSelectText(e) {
			const textOffsets = textOffsetsRef.current;
			const selection = rangy.getSelection();
			const value = selection.toString();
			const bookmark =
				selection.getBookmark(docRef.current).rangeBookmarks[0] || {};

			const canSelect =
				onSelectText && textOffsets && bookmark.end > bookmark.start;
			if (!canSelect) {
				return;
			}

			const selectedTextOffsets = textOffsets.filter(
				({ startOffset, endOffset, position, isNewline }) => {
					return (
						position &&
						bookmark.start <= endOffset &&
						bookmark.end >= startOffset &&
						!isNewline // TODO: this is hacky but works for markdown
					);
				},
			);

			const firstSelectedTextOffset = selectedTextOffsets[0];
			const lastSelectedTextOffset =
				selectedTextOffsets[selectedTextOffsets.length - 1];

			const startOffset =
				firstSelectedTextOffset.position.start.offset +
				(bookmark.start - firstSelectedTextOffset.startOffset);

			let endOffset;
			if (selectedTextOffsets.length === 1) {
				endOffset = startOffset + (bookmark.end - bookmark.start);
			} else {
				endOffset =
					lastSelectedTextOffset.position.start.offset +
					(bookmark.end - lastSelectedTextOffset.startOffset);
			}

			onSelectText({ startOffset, endOffset, value }, e);
			selection.removeAllRanges();
		}

		window.addEventListener('mouseup', handleSelectText);

		return () => {
			window.removeEventListener('mouseup', handleSelectText);
		};
	});

	function extractor(textOffsets) {
		textOffsetsRef.current = textOffsets;
	}

	function clickAnnotation(annotation, e) {
		if (onAnnotationClick) {
			e.stopPropagation();
			onAnnotationClick(annotation, e);
		}
	}

	function hoverAnnotation(annotation, e) {
		if (onAnnotationHover) {
			e.stopPropagation();
			onAnnotationHover(annotation, e);
		}

		if (getAnnotationTooltip) {
			tooltip = tippy(e.target, {
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

	// Set up unified processor to compile content
	const processor = createProcessor(contentType, sanitizeSchema);
	processor.use(extractTextOffsets, extractor).use(annotate, annotations, {
		clickAnnotation,
		hoverAnnotation,
	});
	rehypePlugins.forEach(([plugin, ...args]) => {
		processor.use(plugin, ...args);
	});
	processor.use(rehype2react, { createElement });
	const compiled = processor.processSync(content).contents;

	return <div ref={docRef}>{compiled}</div>;
}
