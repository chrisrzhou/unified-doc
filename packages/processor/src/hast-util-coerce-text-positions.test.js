import { cloneDeep } from 'lodash';

import coerceTextPositions from './hast-util-coerce-text-positions';

describe('hast-util-coerce-text-positions.js', () => {
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
		const clonedTree = cloneDeep(tree);
		expect(coerceTextPositions(clonedTree)).toEqual(tree);
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
		const clonedTree = cloneDeep(tree);
		expect(coerceTextPositions(clonedTree)).toEqual({
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
