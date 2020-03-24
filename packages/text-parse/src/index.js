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
				type: 'text',
				value: doc,
				position: {
					start: {
						column: 1,
						line: 1,
						offset: 0,
					},
					end: {
						column: lastLine.length + 1,
						line: lines.length,
						offset: doc.length,
					},
				},
			},
		],
	};
}

export default function parse() {
	this.Parser = parser;
}
