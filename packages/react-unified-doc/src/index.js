import { createProcessor } from '@unified-doc/processor';
import rangy from 'rangy';
import React, { createElement, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';

export default function ReactUnifiedDocument({
	annotations = [],
	content,
	contentType,
	onClickAnnotation,
	onHoverAnnotation,
	onSelectText,
	rehypePlugins = [],
	sanitizeSchema = {},
}) {
	const textOffsetsRef = useRef();
	const ref = useRef();

	useEffect(() => {
		function handleMouseup(e) {
			const selection = rangy.getSelection();
			const value = selection.toString();
			const bookmark =
				selection.getBookmark(ref.current).rangeBookmarks[0] || {};

			console.log(bookmark);
			const canSelect =
				onSelectText && textOffsetsRef.current && bookmark.end > bookmark.start;
			if (!canSelect) {
				return;
			}

			const textOffsets = textOffsetsRef.current;
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

		window.addEventListener('mouseup', handleMouseup);

		return () => {
			window.removeEventListener('mouseup', handleMouseup);
		};
	});

	function extractor(textOffsets) {
		textOffsetsRef.current = textOffsets;
	}

	// Set up unified processor to compile content
	const processor = createProcessor(
		contentType,
		annotations,
		{
			onClickAnnotation,
			onHoverAnnotation,
		},
		{
			extractor,
			sanitizeSchema,
		},
	);
	rehypePlugins.forEach(([plugin, ...args]) => {
		processor.use(plugin, ...args);
	});
	processor.use(rehype2react, { createElement });
	const compiled = processor.processSync(content).contents;

	return <div ref={ref}>{compiled}</div>;
}
