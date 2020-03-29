export default {
	dest: 'dist/docs',
	menu: [
		'Home',
		'Readme',
		{
			name: 'react-unified-doc',
			menu: [
				'Readme',
				'Props',
				'Content',
				'Annotations',
				'Selecting Text',
				'Styling',
				'Plugins',
			],
		},
		{
			name: 'Gallery',
			menu: [],
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
