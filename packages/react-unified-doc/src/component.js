import rangy from 'rangy';
import React, { useEffect, useRef, useState } from 'react';

import { getProcessor } from './parse';

function ReactUnifiedDocument({
	content,
	fileType = 'html',
	highlightClassName = 'unified-highlight',
	onClickHighlight,
	onMouseOverHighlight,
	plugins,
	sanitizeSchema,
}) {
	const ref = useRef();
	const [highlights, setHighlights] = useState([]);

	useEffect(() => {
		rangy.init();
	});

	function handleMouseup() {
		const selection = rangy.getSelection();
		const bookmark = selection.getBookmark(ref.current).rangeBookmarks[0];
		const position = bookmark
			? {
					startOffset: bookmark.start,
					endOffset: bookmark.end,
			  }
			: null;
		const { focusNode, anchorNode } = selection;
		console.log(
			'focusNode',
			focusNode,
			focusNode.parentNode,
			'anchorNode',
			anchorNode,
			anchorNode.parentNode,
			'position',
			position,
		);
		const startOffset = 30;
		const endOffset = 60;
		const updatedHighlights = [
			{
				startOffset,
				endOffset,
				id: Math.random().toFixed(4),
			},
		];
		setHighlights(updatedHighlights);
	}

	const processor = getProcessor({
		fileType,
		highlightClassName,
		highlights,
		onClickHighlight,
		onMouseOverHighlight,
		plugins,
		sanitizeSchema,
	});
	return (
		<div ref={ref} onMouseUp={handleMouseup}>
			{processor.processSync(content).contents}
		</div>
	);
}

export default ReactUnifiedDocument;
