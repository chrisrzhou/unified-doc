import rangy from 'rangy';
import React, { useRef, useState } from 'react';

import createProcessor from './processor';

export default function ReactUnifiedDocument({
	annotations,
	content,
	callbacks,
	fileType = 'html',
	offsetsDataAttribute = 'data-offsets',
	plugins,
}) {
	const textOffsetsRef = useRef();
	const ref = useRef();

	function extractTextOffsets(textOffsets) {
		textOffsetsRef.current = textOffsets;
	}

	function handleMouseup(e) {
		const { onSelectText } = callbacks;
		const selection = rangy.getSelection();
		const bookmark = selection.getBookmark(ref.current).rangeBookmarks[0];

		const canSelect =
			onSelectText && textOffsetsRef.current && bookmark.end > bookmark.start;

		if (!canSelect) {
			return;
		}

		const value = selection.toString();

		const textOffsets = textOffsetsRef.current;
		const selectedTextOffsets = textOffsets.filter(
			({ startOffset, endOffset }) => {
				return endOffset >= bookmark.start && startOffset <= bookmark.end;
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

	const processor = createProcessor({
		annotations,
		callbacks,
		extractTextOffsets,
		fileType,
		offsetsDataAttribute,
		plugins,
	});

	return (
		<div ref={ref} onMouseUp={handleMouseup}>
			{processor.processSync(content).contents}
		</div>
	);
}
