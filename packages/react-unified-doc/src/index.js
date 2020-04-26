import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
import { createProcessor } from '@unified-doc/processor';
import React, { createElement, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';
import tippy, { followCursor } from 'tippy.js';
import { v4 as uuidv4 } from 'uuid';

import { getSelectedTextOffset } from './select-text';

const createPlugin = (transform) => (...args) => (tree) =>
	transform(tree, ...args);

const annotate = createPlugin(annotateUtil);
const extractTextOffsets = createPlugin(extractTextOffsetsUtil);

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
	const textOffsetsRef = useRef();

	useEffect(() => {
		const textOffsets = textOffsetsRef.current;
		const docNode = docRef.current;

		function handleSelectText(event) {
			const selection = window.getSelection();
			const selectedTextOffset = getSelectedTextOffset(docNode, selection);

			if (
				onSelectText &&
				selectedTextOffset &&
				selectedTextOffset.endOffset > selectedTextOffset.startOffset
			) {
				const selectedTextOffsets = textOffsets.filter(
					({ startOffset, endOffset, position, isNewline }) => {
						return (
							position &&
							selectedTextOffset.startOffset <= endOffset &&
							selectedTextOffset.endOffset >= startOffset &&
							!isNewline // TODO: this is hacky but works for markdown
						);
					},
				);

				const firstSelectedTextOffset = selectedTextOffsets[0];
				const lastSelectedTextOffset =
					selectedTextOffsets[selectedTextOffsets.length - 1];

				const startOffset =
					firstSelectedTextOffset.position.start.offset +
					(selectedTextOffset.startOffset -
						firstSelectedTextOffset.startOffset);

				let endOffset;
				if (selectedTextOffsets.length === 1) {
					endOffset =
						startOffset +
						(selectedTextOffset.endOffset - selectedTextOffset.startOffset);
				} else {
					endOffset =
						lastSelectedTextOffset.position.start.offset +
						(selectedTextOffset.endOffset - lastSelectedTextOffset.startOffset);
				}

				const value = docNode.textContent.slice(
					selectedTextOffset.startOffset,
					selectedTextOffset.endOffset,
				);

				onSelectText({ id: uuidv4(), startOffset, endOffset, value }, event);
				selection.removeAllRanges();
			}
		}

		window.addEventListener('mouseup', handleSelectText);

		return () => {
			window.removeEventListener('mouseup', handleSelectText);
		};
	}, [onSelectText]);

	function extractor(textOffsets) {
		textOffsetsRef.current = textOffsets;
	}

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

	// Set up unified processor to compile content
	const processor = createProcessor(contentType, sanitizeSchema);
	processor.use(extractTextOffsets, extractor).use(annotate, annotations, {
		onClick,
		onMouseEnter,
		onMouseOut,
	});
	rehypePlugins.forEach((plugin) => {
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
