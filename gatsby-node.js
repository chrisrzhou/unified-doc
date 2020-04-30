const path = require('path');

exports.onCreateWebpackConfig = (args) => {
	args.actions.setWebpackConfig({
		resolve: {
			modules: [
				path.resolve(__dirname, '../docs'),
				path.resolve(__dirname, '../packages'),
				path.resolve(__dirname, '../src'),
				'node_modules',
			],
			alias: {
				'@docs': path.resolve(__dirname, '../docs'),
				'@packages': path.resolve(__dirname, '../packages'),
				'@src': path.resolve(__dirname, '../src'),
			},
		},
	});
};
