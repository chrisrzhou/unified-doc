export default {
	dest: 'dist/docs',
	ignore: ['todos.md'],
	menu: [
		'Home',
		'Quick Start',
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
		{
			name: 'Packages',
			menu: [
				'hast-util-annotate',
				'hast-util-extract-text-offsets',
				'processor',
				'text-parse',
			],
		},
		'Changelog',
	],
	public: 'public',
	title: 'unified-doc',
	typescript: true,
};
