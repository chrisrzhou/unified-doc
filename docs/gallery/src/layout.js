import React from 'react';
import Document from '../../../packages/react-unified-doc/src';

import { Card, FlexLayout, Link } from '../../ui';

import '../../src/doc.css';

export default function Layout({
	docProps,
	header = null,
	name,
	sidebar = null,
}) {
	const { contentType = 'html' } = docProps;

	return (
		<FlexLayout alignItems="flex-start" flexDirection="column">
			<Link
				href={`https://github.com/chrisrzhou/unified-doc/tree/master/docs/gallery/src/${name}.js
				`}>
				Source code
			</Link>
			{header && (
				<Card bg="white" sx={{ width: '100%' }} p="m">
					{header}
				</Card>
			)}
			<FlexLayout sx={{ width: '100%' }}>
				<Card sx={{ width: '100%' }}>
					<Document
						className={`doc ${contentType === 'text' ? ' doc-text' : ''}`}
						contentType={contentType}
						{...docProps}
					/>
				</Card>
				{sidebar && <Card sx={{ flex: '0 0 400px' }}>{sidebar}</Card>}
			</FlexLayout>
		</FlexLayout>
	);
}
