export default {
	dest: 'dist/docs',
	menu: [
		'Home',
		'Readme',
		'Gallery',
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
