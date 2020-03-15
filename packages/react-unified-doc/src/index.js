import { createProcessor } from '@unified-doc/processor';
import rangy from 'rangy';
import React, { createElement, useRef } from 'react';
import rehype2react from 'rehype-react';

const annotationTypes = ['highlight', 'redline', 'strikethrough'];

export default function ReactUnifiedDocument({
	annotations = [],
	content,
	contentType,
	onClickAnnotation,
	onHoverAnnotation,
	onSelectText,
	rehypePlugins = [],
}) {
	const textOffsetsRef = useRef();
	const ref = useRef();

	// Auto-apply annotation styles based on annotation type
	const styledAnnotations = annotations.map(annotation => {
		const classNames = annotation.classNames || [];
		return {
			...annotation,
			classNames: annotationTypes.includes(annotation.type)
				? [`annotation-${annotation.type}`, ...classNames]
				: classNames,
		};
	});

	function extractor(textOffsets) {
		textOffsetsRef.current = textOffsets;
	}

	// Set up unified processor to compile content
	const processor = createProcessor(
		contentType,
		styledAnnotations,
		{
			onClickAnnotation,
			onHoverAnnotation,
		},
		extractor,
	);
	rehypePlugins.forEach(([plugin, ...args]) => {
		processor.use(plugin, ...args);
	});
	processor.use(rehype2react, { createElement });
	const compiled = processor.processSync(content).contents;

	function handleMouseup(e) {
		const selection = rangy.getSelection();
		const bookmark = selection.getBookmark(ref.current).rangeBookmarks[0];

		const canSelect =
			onSelectText && textOffsetsRef.current && bookmark.end > bookmark.start;
		if (!canSelect) {
			return;
		}

		const textOffsets = textOffsetsRef.current;
		const selectedTextOffsets = textOffsets.filter(
			({ startOffset, endOffset, position }) => {
				return (
					position && bookmark.start <= endOffset && bookmark.end >= startOffset
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

		onSelectText({ startOffset, endOffset, value: selection.toString() }, e);
		selection.removeAllRanges();
	}

	return (
		<div ref={ref} onMouseUp={handleMouseup}>
			{compiled}
		</div>
	);
}
