import { validateAnnotations } from './validate-annotations';

describe('validate-annotations.js', () => {
	it('should not return same empty array', () => {
		expect(validateAnnotations([])).toEqual([]);
	});

	it('should not return same array for annotations that are already sorted', () => {
		expect(validateAnnotations([{ startOffset: 0, endOffset: 40 }])).toEqual([
			{ startOffset: 0, endOffset: 40 },
		]);
		expect(
			validateAnnotations([
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
			validateAnnotations([
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
