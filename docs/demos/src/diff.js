import { diffChars } from 'diff';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { htmlContent, markdownContent } from '@docs/data';
import { FlexLayout, Textarea, Select } from '@docs/ui';

import Layout from './layout';
import './diff.css';

export default function DiffDemo() {
	const [oldContent, setOldContent] = useState(htmlContent);
	const [newContent, setNewContent] = useState(markdownContent);
	const [contentType, setContentType] = useState('text');
	const [document, setDocument] = useState('diff');

	const diff = diffChars(oldContent, newContent);
	let annotations = [];
	let diffContent = '';
	let startOffset = 0;
	let endOffset = 0;
	diff.forEach((part) => {
		const { added, count, removed, value } = part;
		diffContent += value;
		endOffset += count;
		if (added || removed) {
			annotations.push({
				classNames: [added ? 'diff-added' : 'diff-removed'],
				id: uuidv4(),
				startOffset,
				endOffset,
				value,
			});
		}

		startOffset = endOffset;
	});

	let content;
	switch (document) {
		case 'old':
			content = oldContent;
			annotations = [];
			break;
		case 'new':
			content = newContent;
			annotations = [];
			break;
		case 'diff':
		default:
			content = diffContent;
	}

	const header = (
		<FlexLayout>
			<Select
				id="content-type"
				label="Content Type"
				options={[
					{ label: 'text', value: 'text' },
					{ label: 'html', value: 'html' },
				]}
				value={contentType}
				onChange={setContentType}
			/>
			<Select
				id="document"
				label="Document"
				options={[
					{ label: 'Old', value: 'old' },
					{ label: 'New', value: 'new' },
					{ label: 'Diff', value: 'diff' },
				]}
				value={document}
				onChange={setDocument}
			/>
		</FlexLayout>
	);

	const sidebar = (
		<FlexLayout flexDirection="column" spacing="m">
			<Textarea
				id="old"
				height="240px"
				label="Old"
				value={oldContent}
				onChange={(value) => {
					setOldContent(value);
					setDocument('diff');
				}}
			/>
			<Textarea
				id="new"
				height="240px"
				label="New"
				value={newContent}
				onChange={(value) => {
					setNewContent(value);
					setDocument('diff');
				}}
			/>
		</FlexLayout>
	);

	const docProps = {
		annotations,
		content,
		contentType,
	};

	return (
		<Layout docProps={docProps} header={header} name="diff" sidebar={sidebar} />
	);
}
