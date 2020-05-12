import React, { useState } from 'react';

import { content } from '@docs/data';
import { Annotations, FlexLayout, Select } from '@docs/ui';

import Layout from './layout';

const bookmarkCategories = [
	{ label: 'default', value: 'default' },
	{ label: 'important', value: 'important' },
	{ label: 'quote', value: 'quote' },
	{ label: 'redline', value: 'redline' },
];

export default function EbookDemo() {
	const [annotations, setAnnotations] = useState([]);
	const [bookmarkCategory, setBookmarkCategory] = useState('default');

	const header = (
		<FlexLayout flexDirection="column" space="xs">
			<Select
				id="bookmark-category"
				label="Bookmark Category"
				options={bookmarkCategories}
				value={bookmarkCategory}
				onChange={setBookmarkCategory}
			/>
			<Annotations
				annotations={annotations}
				onClearAnnotations={() => setAnnotations([])}
				onRemoveAnnotation={(annotationToRemove) =>
					setAnnotations(
						annotations.filter(({ id }) => id !== annotationToRemove.id),
					)
				}
			/>
		</FlexLayout>
	);

	const docProps = {
		annotations,
		content,
		onAnnotationClick: (annotation) => {
			// eslint-disable-next-line no-alert
			const removeBookmark = window.confirm(
				'Do you want to remove this bookmark?',
			);
			if (removeBookmark) {
				setAnnotations(annotations.filter(({ id }) => annotation.id !== id));
			}
		},
		onSelectText: (annotation) => {
			const { value } = annotation;
			// eslint-disable-next-line no-alert
			const addBookmark = window.confirm(
				`Do you want to bookmark:\n\n"${
					value.length < 100 ? value : value.slice(0, 100) + '…'
				}"?`,
			);
			if (addBookmark) {
				setAnnotations([
					...annotations,
					{
						...annotation,
						classNames: [bookmarkCategory],
					},
				]);
			}
		},
	};

	return <Layout docProps={docProps} header={header} name="ebook" />;
}
