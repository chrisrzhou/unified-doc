import React, { useState } from 'react';
import { Box, Checkbox, Flex, Label, Select } from 'theme-ui';

import { htmlContent, markdownContent } from './data';
import ExampleLayout from './example-layout';
import ReactUnifiedDoc, { ContentType } from './react-unified-doc';

const classNames = ['doc', 'dark', 'ewww'];
const contentTypes = ['text', 'markdown', 'html'];

export default function ExampleContent(): JSX.Element {
	const [className, setClassName] = useState('doc');
	const [contentType, setContentType] = useState<ContentType>('html');
	const [enableCustomSanitize, setEnableCustomSanitize] = useState(false);

	let sx;
	switch (className) {
		case 'dark':
			sx = {
				background: 'black',
				color: 'white',
			};
			break;
		case 'ewww':
			sx = {
				background: 'brown',
				color: 'white',
				fontFamily: 'impact',
			};
			break;
		case 'doc':
		default:
			sx = {};
	}

	const content = contentType === 'markdown' ? markdownContent : htmlContent;
	const sanitizeSchema = enableCustomSanitize
		? { attributes: { '*': ['className', 'style'] } }
		: undefined;

	return (
		<Box>
			<Flex sx={{ alignItems: 'flex-end' }}>
				<Box>
					<Label htmlFor="contentType">Content Type</Label>
					<Select
						name="contentType"
						sx={{ width: 200 }}
						value={contentType}
						onChange={e => setContentType(e.target.value as ContentType)}>
						{contentTypes.map(contentType => (
							<option key={contentType} value={contentType}>
								{contentType}
							</option>
						))}
					</Select>
				</Box>
				<Box ml={4}>
					<Label htmlFor="cssStyles">CSS Styles</Label>
					<Select
						name="cssStyles"
						sx={{ width: 200 }}
						value={className}
						onChange={e => setClassName(e.target.value)}>
						{classNames.map(className => (
							<option key={className} value={className}>
								{className}
							</option>
						))}
					</Select>
				</Box>
				<Label ml={4}>
					<Checkbox
						checked={enableCustomSanitize}
						onChange={_e => setEnableCustomSanitize(!enableCustomSanitize)}
					/>
					Use custom sanitize schema
				</Label>
			</Flex>
			<ExampleLayout
				content={content}
				rightContentTitle="Sanitize Schema"
				rightContent={JSON.stringify(sanitizeSchema, null, 2)}>
				<Box sx={sx}>
					<ReactUnifiedDoc
						content={content}
						contentType={contentType}
						sanitizeSchema={sanitizeSchema}
					/>
				</Box>
			</ExampleLayout>
		</Box>
	);
}
