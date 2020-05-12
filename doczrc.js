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
		'Packages',
		'unified-doc',
		'unified-doc-parse-text',
		{
			name: 'unified-doc-react',
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
		'unified-doc-util-annotate',
		'Changelog',
	],
	public: 'public',
	title: 'unified-doc',
	typescript: true,
};
