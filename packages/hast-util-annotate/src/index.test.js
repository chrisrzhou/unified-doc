import { getTextSegments } from '.';

describe('hast-util-highlight-text.js', () => {
	describe('getTextSegments', () => {
		const node = {
			position: { start: { offset: 40 }, end: { offset: 66 } },
			value: 'abcdefghijklmnopqrstuvwxyz',
		};
		it('should not return segment if highlight strictly left of position', () => {
			expect(getTextSegments(node, { startOffset: 0, endOffset: 40 })).toEqual(
				null,
			);
		});
		it('should not return segment if highlight strictly right of position', () => {
			expect(
				getTextSegments(node, { startOffset: 100, endOffset: 200 }),
			).toEqual(null);
		});
		it('should return segment if highlight is exactly the same as position', () => {
			expect(
				getTextSegments(node, { startOffset: 40, endOffset: 100 }),
			).toEqual(['', 'abcdefghijklmnopqrstuvwxyz', '']);
		});
		it('should return segment if highlight is a contained within position', () => {
			expect(
				getTextSegments(node, { startOffset: 44, endOffset: 54 }),
			).toEqual(['abcd', 'efghijklmn', 'opqrstuvwxyz']);
		});
		it('should return segment if position is contained within highlight', () => {
			expect(
				getTextSegments(node, { startOffset: 0, endOffset: 200 }),
			).toEqual(['', 'abcdefghijklmnopqrstuvwxyz', '']);
		});
		it('should return segment if highlight is contained left of position', () => {
			expect(getTextSegments(node, { startOffset: 0, endOffset: 50 })).toEqual([
				'',
				'abcdefghij',
				'klmnopqrstuvwxyz',
			]);
		});
		it('should return segment if highlight is contained right of position', () => {
			expect(
				getTextSegments(node, { startOffset: 60, endOffset: 200 }),
			).toEqual(['abcdefghijklmnopqrst', 'uvwxyz', '']);
		});
	});
});
