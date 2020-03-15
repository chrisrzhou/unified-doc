// Primitive unified parser to parse raw text into a single div text node
export function parser(doc) {
	if (!doc) {
		return {
			type: 'root',
			children: [],
		};
	}

	const lines = doc.split(/\n/g);
	const lastLine = lines[lines.length - 1];
	return {
		type: 'root',
		children: [
			{
				type: 'element',
				tagName: 'div',
				properties: {
					style: {
						whiteSpace: 'pre',
					},
				},
				children: [
					{
						type: 'text',
						value: doc,
						position: {
							start: {
								column: 1,
								line: 1,
								offset: 0,
							},
							end: {
								column: lastLine.length,
								line: lines.length,
								offset: doc.length - 1,
							},
						},
					},
				],
			},
		],
	};
}

export default function parse() {
	this.Parser = parser;
}
