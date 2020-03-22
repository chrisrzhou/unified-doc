/** Always sort annotations by { startOffset: 'asc', endOffset: 'desc' }] */
export function validateAnnotations(annotations) {
	const sortedAnnotations = annotations.sort((a, b) => {
		if (a.startOffset < b.startOffset) {
			return -1;
		}

		if (a.startOffset > b.startOffset) {
			return 1;
		}

		if (a.endOffset < b.endOffset) {
			return 1;
		}

		if (a.endOffset > b.endOffset) {
			return -1;
		}

		return 0;
	});
	return sortedAnnotations;
}
