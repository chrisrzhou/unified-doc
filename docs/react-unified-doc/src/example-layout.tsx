import React, { useState } from 'react';
import { Card, ContentArea, FlexLayout, Link, Provider, Select } from './ui';

import ReactUnifiedDoc, { Props as DocProps } from './react-unified-doc';

import './doc.css';

interface Section {
	label: string;
	content: React.ReactElement;
	value: string;
}

interface Props {
	docProps: DocProps;
	header: React.ReactElement;
	name: string;
	sections?: Section[];
}

export default function ExampleLayout({
	docProps,
	header,
	name,
	sections = [],
}: Props): JSX.Element {
	const [selectedSection, setSelectedSection] = useState('source');

	const { annotations, content, contentType = 'html' } = docProps;

	const doc = <ReactUnifiedDoc contentType={contentType} {...docProps} />;

	const sourceContent = (
		<ContentArea help="View the source content and annotations applied relative to it.">
			<ReactUnifiedDoc
				annotations={annotations}
				content={content}
				contentType="text"
			/>
		</ContentArea>
	);

	const sectionOptions = [
		...sections,
		{
			label: 'Source content',
			content: sourceContent,
			value: 'source',
		},
	];

	const sectionContent = sectionOptions.find(
		option => option.value === selectedSection,
	).content;

	return (
		<Provider>
			<FlexLayout flexDirection="column">
				<Link
					href={`https://github.com/chrisrzhou/unified-doc/tree/master/docs/react-unified-doc/src/example-${name}.tsx
				`}
					sx={{ alignSelf: 'flex-start' }}>
					Source code
				</Link>
				<Card>{header}</Card>
				<FlexLayout>
					<Card>{doc}</Card>
					<Card sx={{ flex: '0 0 400px' }}>
						<Select
							id="view"
							label="View"
							options={sectionOptions}
							value={selectedSection}
							onChange={setSelectedSection}
						/>
						{sectionContent}
					</Card>
				</FlexLayout>
			</FlexLayout>
		</Provider>
	);
}
