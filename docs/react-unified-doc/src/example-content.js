import React, { useState } from 'react';

import { htmlContent, markdownContent } from './data';
import Layout from './layout';
import { Checkbox, ContentArea, FlexLayout, Select } from '../../ui';

const contentTypes = [
	{ label: 'text', value: 'text' },
	{ label: 'markdown', value: 'markdown' },
	{ label: 'html', value: 'html' },
];

export default function ExampleContent() {
	const [contentType, setContentType] = useState('html');
	const [enableCustomSanitizeSchema, setEnableCustomSanitizeSchema] = useState(
		false,
	);

	const sanitizeSchema = enableCustomSanitizeSchema
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
				onChange={(value) => {
					setContentType(value);
					if (value !== 'html') {
						setEnableCustomSanitizeSchema(false);
					}
				}}
			/>
			<Checkbox
				id="custom-sanitize-schema"
				label="Custom Sanitize Schema"
				value={enableCustomSanitizeSchema}
				onChange={(value) => {
					setEnableCustomSanitizeSchema(value);
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
		<Layout
			docProps={docProps}
			header={header}
			name="content"
			sections={sections}
		/>
	);
}
