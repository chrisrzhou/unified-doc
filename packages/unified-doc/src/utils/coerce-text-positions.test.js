import coerceTextPositions from './coerce-text-positions';

describe('coerceTextPositions', () => {
	it('should return same tree if no text node positions to coerce', () => {
		const tree = {
			type: 'root',
			children: [
				{
					type: 'text',
					position: 'MockPosition1',
				},
				{
					type: 'element',
					tagName: 'b',
					position: 'MockPosition2',
					children: [
						{
							type: 'text',
							position: 'MockPosition3',
						},
					],
				},
			],
		};
		expect(coerceTextPositions(tree)).toEqual(tree);
	});

	it('should coerce text position if it is undefined and use its direct parent position', () => {
		const tree = {
			type: 'root',
			children: [
				{
					type: 'text',
					position: 'MockPosition1',
				},
				{
					type: 'element',
					tagName: 'div',
					position: 'MockPosition2',
					children: [
						{
							type: 'element',
							tagName: 'b',
							position: 'MockPosition3',
							children: [
								{
									type: 'text',
								},
							],
						},
						{
							type: 'text',
						},
					],
				},
			],
		};
		expect(coerceTextPositions(tree)).toEqual({
			type: 'root',
			children: [
				{
					type: 'text',
					position: 'MockPosition1',
				},
				{
					type: 'element',
					tagName: 'div',
					position: 'MockPosition2',
					children: [
						{
							type: 'element',
							tagName: 'b',
							position: 'MockPosition3',
							children: [
								{
									type: 'text',
									position: 'MockPosition3',
								},
							],
						},
						{
							type: 'text',
							position: 'MockPosition2',
						},
					],
				},
			],
		});
	});
});
