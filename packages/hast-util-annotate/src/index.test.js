import { splitText } from '.';

describe('splitText', () => {
	const node = {
		type: 'test',
		position: {
			start: {
				line: 0,
				column: 0,
				offset: 40,
			},
			end: {
				line: 0,
				column: 0,
				offset: 66,
			},
		},
		value: 'abcdefghijklmnopqrstuvwxyz',
	};

	it('should not split if annotation is strictly left of position', () => {
		expect(splitText(node, { startOffset: 0, endOffset: 40 })).toEqual(null);
	});

	it('should not split if annotation is strictly right of position', () => {
		expect(splitText(node, { startOffset: 100, endOffset: 200 })).toEqual(null);
	});

	it('should split if annotation is exactly the same as position', () => {
		expect(splitText(node, { startOffset: 40, endOffset: 100 })).toEqual([
			'',
			'abcdefghijklmnopqrstuvwxyz',
			'',
		]);
	});

	it('should split if position is contained within annotation', () => {
		expect(splitText(node, { startOffset: 0, endOffset: 200 })).toEqual([
			'',
			'abcdefghijklmnopqrstuvwxyz',
			'',
		]);
	});

	it('should split if annotation is contained within position', () => {
		expect(splitText(node, { startOffset: 44, endOffset: 54 })).toEqual([
			'abcd',
			'efghijklmn',
			'opqrstuvwxyz',
		]);
	});

	it('should split if annotation is contained left of position', () => {
		expect(splitText(node, { startOffset: 0, endOffset: 50 })).toEqual([
			'',
			'abcdefghij',
			'klmnopqrstuvwxyz',
		]);
	});

	it('should split if annotation is contained right of position', () => {
		expect(splitText(node, { startOffset: 60, endOffset: 200 })).toEqual([
			'abcdefghijklmnopqrst',
			'uvwxyz',
			'',
		]);
	});
});

describe('hast-util-annotate.js', () => {
	it('should not highlight anything if offset is not covering any text nodes', () => {});

	it('should highlight text node if offset is within text node', () => {});

	it('should highlight text node if text node is within offset', () => {});

	it('should highlight text node if text node is left of offset', () => {});

	it('should highlight text node if text node is right of offset', () => {});

	it('should highlight multiple text nodes if offset covers them', () => {});

	it('should apply latest annotation if multiple annotations cover the same nodes', () => {});

	it('should apply classnames', () => {});

	it('should apply callbacks', () => {});
});
