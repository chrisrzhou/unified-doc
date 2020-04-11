import React, { useState } from 'react';

import { content } from './data';
import Layout from './layout';
import { Annotations, FlexLayout, Select } from '../../ui';

const bookmarkCategories = [
	{ label: 'default', value: 'default' },
	{ label: 'quote', value: 'quote' },
	{ label: 'important', value: 'important' },
];

function Ebook() {
	const [annotations, setAnnotations] = useState([]);
	const [bookmarkCategory, setbookmarkCategory] = useState('default');

	const annotationsWithPermalinks = annotations.map((annotation) => ({
		...annotation,
		anchor: true,
	}));

	const header = (
		<FlexLayout flexDirection="column" space="xs">
			<Select
				id="bookmark-category"
				label="Bookmark Category"
				options={bookmarkCategories}
				value={bookmarkCategory}
				onChange={setbookmarkCategory}
			/>
			<Annotations
				annotations={annotationsWithPermalinks}
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

export default Ebook;
