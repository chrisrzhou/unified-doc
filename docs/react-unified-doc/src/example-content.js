import React, { useState } from 'react';

import { htmlContent, markdownContent } from './data';
import ExampleLayout from './example-layout';
import { Checkbox, ContentArea, FlexLayout, Select } from './ui';

const contentTypes = [
	{ label: 'text', value: 'text' },
	{ label: 'markdown', value: 'markdown' },
	{ label: 'html', value: 'html' },
];

export default function ExampleContent() {
	const [contentType, setContentType] = useState('html');
	const [enableCustomSanitize, setEnableCustomSanitize] = useState(true);

	const sanitizeSchema = enableCustomSanitize
		? { attributes: { '*': ['className', 'style'] } }
		: {};

	const content = contentType === 'markdown' ? markdownContent : htmlContent;

	const header = (
		<FlexLayout alignItems="flex-end">
			<Select
				id="content-type"
				label="Content Type"
				value={contentType}
				options={contentTypes}
				onChange={value => {
					setContentType(value);
					if (value !== 'html') {
						setEnableCustomSanitize(false);
					}
				}}
			/>
			<Checkbox
				id="custom-sanitize"
				label="Custom Sanitize"
				value={enableCustomSanitize}
				onChange={value => {
					setEnableCustomSanitize(value);
					if (value) {
						setContentType('html');
					}
				}}
			/>
		</FlexLayout>
	);

	const sections = [
		{
			label: 'Sanitize schema',
			content: (
				<ContentArea help="https://github.com/syntax-tree/hast-util-sanitize#schema">
					{JSON.stringify(sanitizeSchema, null, 2)}
				</ContentArea>
			),
			value: 'sanitize-schema',
		},
	];

	const docProps = {
		content,
		contentType,
		sanitizeSchema,
	};

	return (
		<ExampleLayout
			docProps={docProps}
			header={header}
			name="content"
			sections={sections}
		/>
	);
}
