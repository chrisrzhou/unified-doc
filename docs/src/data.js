export const contentTypes = [
	{
		id: 'text',
		filename: 'content1',
		contentType: 'text',
	},
	{
		id: 'markdown',
		filename: 'content2',
		contentType: 'markdown',
	},
	{
		id: 'html',
		filename: 'content3',
		contentType: 'html',
	},
];

export const hast = {
	type: 'root',
	children: [
		{
			type: 'element',
			tagName: 'h3',
			children: [
				{
					type: 'text',
					value: 'In Congress, July 4, 1776',
				},
			],
		},
		{
			type: 'element',
			tagName: 'blockqote',
			children: [
				{
					type: 'text',
					value: 'this is a blockquote',
				},
			],
		},
	],
};

export const hastAnnotated = {
	type: 'root',
	children: [
		{
			type: 'element',
			tagName: 'h3',
			children: [
				{
					type: 'text',
					value: 'In Congress, ',
				},
				{
					type: 'element',
					tagName: 'mark',
					properties: {
						class: ['custom-highlight'],
					},
					children: [
						{
							type: 'text',
							value: 'July 4, 1776.',
						},
					],
				},
			],
		},
		{
			type: 'element',
			tagName: 'blockqote',
			children: [
				{
					type: 'text',
					value: 'this is a blockquote',
				},
			],
		},
	],
};
