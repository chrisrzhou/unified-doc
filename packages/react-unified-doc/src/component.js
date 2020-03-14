import rangy from 'rangy';
import React, { useRef } from 'react';

import createProcessor from './processor';

export default function ReactUnifiedDocument({
	annotations,
	callbacks,
	content,
	fileType = 'html',
	rehypePlugins,
}) {
	const textOffsetsRef = useRef();
	const ref = useRef();

	function extractor(textOffsets) {
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
			({ startOffset, endOffset, position }) => {
				return (
					position && bookmark.start <= endOffset && bookmark.end >= startOffset
				);
			},
		);
		console.log(textOffsets);

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
		extractor,
		fileType,
		rehypePlugins,
	});

	return (
		<div ref={ref} onMouseUp={handleMouseup}>
			{processor.processSync(content).contents}
		</div>
	);
}
