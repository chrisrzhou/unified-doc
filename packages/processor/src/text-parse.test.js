import { parser } from './text-parse';

describe('text-parse.js', () => {
	describe('parser', () => {
		it('should parse a file with empty content', () => {
			expect(parser('')).toEqual({
				type: 'root',
				children: [],
			});
		});

		it('should parse a file with a single line of content', () => {
			expect(parser('a to the b to the c')).toEqual({
				type: 'root',
				children: [
					{
						type: 'text',
						value: 'a to the b to the c',
						position: {
							start: {
								column: 1,
								line: 1,
								offset: 0,
							},
							end: {
								column: 20,
								line: 1,
								offset: 19,
							},
						},
					},
				],
			});
		});

		it('should parse a file with many lines of content', () => {
			expect(parser('\na to the \nb to the \n\nc to the d')).toEqual({
				type: 'root',
				children: [
					{
						type: 'text',
						value: '\na to the \nb to the \n\nc to the d',
						position: {
							start: {
								column: 1,
								line: 1,
								offset: 0,
							},
							end: {
								column: 11,
								line: 5,
								offset: 32,
							},
						},
					},
				],
			});
		});
	});
});
