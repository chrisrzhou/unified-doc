export default {
	dest: 'dist/docs',
	menu: [
		'Home',
		'Readme',
		{
			name: 'react-unified-doc',
			menu: ['Readme', 'Props', 'Content', 'Annotations', 'Plugins', 'Recipes'],
		},
		'processor',
		'hast-util-annotate',
		'hast-util-extract-text-offsets',
		'Changelog',
	],
	public: 'public',
	themeConfig: {
		styles: {
			root: {
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			},
		},
	},
	title: 'unified-doc',
	typescript: true,
};
