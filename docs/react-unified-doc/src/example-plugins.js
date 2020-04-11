import React, { useState } from 'react';
import highlight from 'rehype-highlight';
import toc from 'rehype-toc';

import { annotations, htmlContent as content } from './data';
import Layout from './layout';
import { Checkbox, ContentArea, FlexLayout } from '../../ui';

import './rehype-highlight.css';

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

export default function ExamplePlugins() {
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
			<Checkbox
				id="rehype-toc"
				label="rehype-toc"
				value={applyToc}
				onChange={setApplyToc}
			/>
			<Checkbox
				id="rehype-highlight"
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
				<ContentArea help="Rehype plugins applied:">
					{JSON.stringify(
						pluginIds.map((id) => plugins[id].name),
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
		content,
		rehypePlugins: pluginIds.map((id) => plugins[id].plugin),
	};

	return (
		<Layout
			docProps={docProps}
			header={header}
			name="plugins"
			sections={sections}
		/>
	);
}
