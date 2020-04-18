import React, { useState } from 'react';
import Document from '../../../packages/react-unified-doc/src';

import { Card, ContentArea, FlexLayout, Link, Select } from '../../ui';

import '../../src/doc.css';

export default function Layout({ docProps, header, name, sections = [] }) {
	const [selectedSection, setSelectedSection] = useState('source');

	const { annotations, content, contentType = 'html' } = docProps;

	const sectionOptions = [
		...sections,
		{
			label: 'Source content',
			content: (
				<ContentArea help="View the source content and annotations applied relative to it.">
					<Document
						annotations={annotations}
						content={content}
						contentType="text"
					/>
				</ContentArea>
			),
			value: 'source',
		},
	];

	return (
		<FlexLayout alignItems="flex-start" flexDirection="column">
			<Link
				href={`https://github.com/chrisrzhou/unified-doc/tree/master/docs/react-unified-doc/src/example-${name}.js
				`}>
				Source code
			</Link>
			<Card sx={{ width: '100%' }}>{header}</Card>
			<FlexLayout sx={{ width: '100%' }}>
				<Card sx={{ width: '100%' }}>
					<Document
						className={`doc ${contentType === 'text' ? ' doc-text' : ''}`}
						contentType={contentType}
						{...docProps}
					/>
				</Card>
				<Card sx={{ flex: '0 0 400px' }}>
					<Select
						id="view"
						label="View"
						options={sectionOptions}
						value={selectedSection}
						onChange={setSelectedSection}
					/>
					{
						sectionOptions.find((option) => option.value === selectedSection)
							.content
					}
				</Card>
			</FlexLayout>
		</FlexLayout>
	);
}
