import sortAnnotations from './sort-annotations';

describe('sort-annotations.js', () => {
	it('should not return same empty array', () => {
		expect(sortAnnotations([])).toEqual([]);
	});

	it('should not return same array for annotations that are already sorted', () => {
		expect(sortAnnotations([{ startOffset: 0, endOffset: 40 }])).toEqual([
			{ startOffset: 0, endOffset: 40 },
		]);
		expect(
			sortAnnotations([
				{ startOffset: 0, endOffset: 40 },
				{ startOffset: 20, endOffset: 50 },
				{ startOffset: 40, endOffset: 120 },
				{ startOffset: 40, endOffset: 80 },
			]),
		).toEqual([
			{ startOffset: 0, endOffset: 40 },
			{ startOffset: 20, endOffset: 50 },
			{ startOffset: 40, endOffset: 120 },
			{ startOffset: 40, endOffset: 80 },
		]);
	});

	it('should sort by startOffset (asc) then endOffset (desc)', () => {
		expect(
			sortAnnotations([
				{ startOffset: 60, endOffset: 80 },
				{ startOffset: 40, endOffset: 120 },
				{ startOffset: 120, endOffset: 140 },
				{ startOffset: 0, endOffset: 40 },
				{ startOffset: 20, endOffset: 50 },
				{ startOffset: 40, endOffset: 80 },
			]),
		).toEqual([
			{ startOffset: 0, endOffset: 40 },
			{ startOffset: 20, endOffset: 50 },
			{ startOffset: 40, endOffset: 120 },
			{ startOffset: 40, endOffset: 80 },
			{ startOffset: 60, endOffset: 80 },
			{ startOffset: 120, endOffset: 140 },
		]);
	});
});
