import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
import { createProcessor } from '@unified-doc/processor';
import rangy from 'rangy';
import React, { createElement, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';
import tippy, { followCursor } from 'tippy.js';
import { v4 as uuidv4 } from 'uuid';

import 'tippy.js/dist/tippy.css';
import './index.css';

const createPlugin = transform => (...args) => tree => transform(tree, ...args);

const annotate = createPlugin(annotateUtil);
const extractTextOffsets = createPlugin(extractTextOffsetsUtil);

let tooltip;

export default function ReactUnifiedDocument({
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
	const textOffsetsRef = useRef();

	useEffect(() => {
		function handleSelectText(e) {
			const textOffsets = textOffsetsRef.current;
			const selection = rangy.getSelection();
			const value = selection.toString();
			const bookmark =
				selection.getBookmark(docRef.current).rangeBookmarks[0] || {};

			const canSelect =
				rehypePlugins.length === 0 &&
				onSelectText &&
				textOffsets &&
				bookmark.end > bookmark.start;
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

			onSelectText({ id: uuidv4(), startOffset, endOffset, value }, e);
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

	function onClick(annotation, e) {
		if (onAnnotationClick) {
			e.stopPropagation();
			onAnnotationClick(annotation, e);
		}
	}

	function onMouseEnter(annotation, e) {
		if (onAnnotationMouseEnter) {
			e.stopPropagation();
			onAnnotationMouseEnter(annotation, e);
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

	function onMouseOut(annotation, e) {
		if (onAnnotationMouseLeave) {
			e.stopPropagation();
			onAnnotationMouseLeave(annotation, e);
		}

		if (tooltip) {
			e.stopPropagation();
			tooltip.destroy();
			tooltip = null;
		}
	}

	// Set up unified processor to compile content
	const processor = createProcessor(contentType, sanitizeSchema);
	processor.use(extractTextOffsets, extractor).use(annotate, annotations, {
		onClick,
		onMouseEnter,
		onMouseOut,
	});
	rehypePlugins.forEach(plugin => {
		processor.use(plugin);
	});
	processor.use(rehype2react, { createElement });
	const compiled = processor.processSync(content).contents;

	return (
		<div ref={docRef} className={className}>
			{compiled}
		</div>
	);
}
