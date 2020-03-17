import splitTextNode from './split-text-node';

describe('split-text-node.js', () => {
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
		expect(splitTextNode(node, { startOffset: 0, endOffset: 40 })).toEqual(
			null,
		);
	});

	it('should not split if annotation is strictly right of position', () => {
		expect(splitTextNode(node, { startOffset: 100, endOffset: 200 })).toEqual(
			null,
		);
	});

	it('should split if annotation is exactly the same as position', () => {
		expect(splitTextNode(node, { startOffset: 40, endOffset: 100 })).toEqual([
			'',
			'abcdefghijklmnopqrstuvwxyz',
			'',
		]);
	});

	it('should split if position is contained within annotation', () => {
		expect(splitTextNode(node, { startOffset: 0, endOffset: 200 })).toEqual([
			'',
			'abcdefghijklmnopqrstuvwxyz',
			'',
		]);
	});

	it('should split if annotation is contained within position', () => {
		expect(splitTextNode(node, { startOffset: 44, endOffset: 54 })).toEqual([
			'abcd',
			'efghijklmn',
			'opqrstuvwxyz',
		]);
	});

	it('should split if annotation is contained left of position', () => {
		expect(splitTextNode(node, { startOffset: 0, endOffset: 50 })).toEqual([
			'',
			'abcdefghij',
			'klmnopqrstuvwxyz',
		]);
	});

	it('should split if annotation is contained right of position', () => {
		expect(splitTextNode(node, { startOffset: 60, endOffset: 200 })).toEqual([
			'abcdefghijklmnopqrst',
			'uvwxyz',
			'',
		]);
	});
});
