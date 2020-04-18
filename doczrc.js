export default {
	dest: 'dist/docs',
	menu: [
		'Home',
		'Readme',
		{
			name: 'Demos',
			menu: ['EBook', 'Search', 'Diff', 'Comments', 'Labeling'],
		},
		{
			name: 'react-unified-doc',
			menu: [
				'Readme',
				'Props',
				'Content',
				'Styling',
				'Annotations',
				'Managing Annotations',
				'Plugins',
			],
		},
		'hast-util-annotate',
		'hast-util-extract-text-offsets',
		'processor',
		'text-parse',
		'Changelog',
	],
	public: 'public',
	title: 'unified-doc',
	typescript: true,
};
