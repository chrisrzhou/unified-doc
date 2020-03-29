import React, { useState } from 'react';
import highlight from 'rehype-highlight';
import toc from 'rehype-toc';

import { annotations, htmlContent } from './data';
import ExampleLayout from './example-layout';
import { Checkbox, ContentArea, FlexLayout } from './ui';

import './github.css';

const plugins = {
	highlight: {
		name: 'rehype-highlight',
		plugin: highlight,
	},
	toc: {
		name: 'rehype-toc',
		plugin: toc,
	},
};

export default function ExamplePlugins(): JSX.Element {
	const [applyToc, setApplyToc] = useState(true);
	const [applyHighlight, setApplyHighlight] = useState(true);

	const pluginIds = [];
	if (applyToc) {
		pluginIds.push('toc');
	}

	if (applyHighlight) {
		pluginIds.push('highlight');
	}

	const header = (
		<FlexLayout>
			<Checkbox label="rehype-toc" value={applyToc} onChange={setApplyToc} />
			<Checkbox
				label="rehype-highlight"
				value={applyHighlight}
				onChange={setApplyHighlight}
			/>
		</FlexLayout>
	);

	const sections = [
		{
			label: 'Plugins',
			content: (
				<ContentArea help="https://github.com/rehypejs/rehype/blob/master/doc/plugins.md">
					{JSON.stringify(
						pluginIds.map(id => plugins[id].name),
						null,
						2,
					)}
				</ContentArea>
			),
			value: 'plugins',
		},
	];

	const docProps = {
		annotations,
		content: htmlContent,
		rehypePlugins: pluginIds.map(id => plugins[id].plugin),
	};

	return (
		<ExampleLayout
			docProps={docProps}
			header={header}
			name="plugins"
			sections={sections}
		/>
	);
}
