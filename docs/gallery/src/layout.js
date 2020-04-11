import React from 'react';
import Document from '../../../packages/react-unified-doc/src';

import { Card, FlexLayout, Link } from '../../ui';

import './doc.scss';

const sanitizeSchema = {
	attributes: {
		'*': ['className', 'style'],
	},
};

export default function Layout({
	docProps,
	header = null,
	name,
	sidebar = null,
}) {
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
			<FlexLayout>
				<Card sx={{ flexGrow: 1 }}>
					<Document
						className="doc"
						contentType="html"
						sanitizeSchema={sanitizeSchema}
						{...docProps}
					/>
				</Card>
				{sidebar && <Card sx={{ flex: '0 0 400px' }}>{sidebar}</Card>}
			</FlexLayout>
		</FlexLayout>
	);
}
