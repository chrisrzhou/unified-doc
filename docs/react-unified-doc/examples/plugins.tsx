import ReactUnifiedDoc from '../../../packages/react-unified-doc/src';
import React, { useState } from 'react';
import highlight from 'rehype-highlight';
import toc from 'rehype-toc';
import { Box, Checkbox, Flex, Label } from 'theme-ui';

import { annotations, htmlContent } from './data';
import Layout from './layout';

import './github.css';

export default function PluginsExample(): JSX.Element {
	const [applyToc, setApplyToc] = useState(true);
	const [applyHighlight, setApplyHighlight] = useState(true);
	const plugins = [];
	if (applyToc) {
		plugins.push({ plugin: toc, name: 'rehype-toc' });
	}

	if (applyHighlight) {
		plugins.push({ plugin: highlight, name: 'rehype-highlight' });
	}

	console.log(plugins);

	return (
		<Box>
			<Flex>
				<Label sx={{ flex: '0 0 200px' }}>
					<Checkbox
						checked={applyToc}
						onChange={_e => setApplyToc(!applyToc)}
					/>
					rehype-toc
				</Label>
				<Label ml={4} sx={{ flex: '0 0 200px' }}>
					<Checkbox
						checked={applyHighlight}
						onChange={_e => setApplyHighlight(!applyHighlight)}
					/>
					rehype-highlight
				</Label>
			</Flex>
			<Layout
				content={htmlContent}
				rightContentTitle="Rehype Plugins"
				rightContent={JSON.stringify(
					plugins.map(plugin => plugin.name),
					null,
					2,
				)}>
				<ReactUnifiedDoc
					annotations={annotations}
					content={htmlContent}
					contentType="html"
					rehypePlugins={plugins.map(({ plugin }) => plugin)}
				/>
			</Layout>
		</Box>
	);
}
