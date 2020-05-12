import React, { useState } from 'react';

import { content } from '@docs/data';
import { Annotations, ContentArea, FlexLayout, Select } from '@docs/ui';

import Layout from './layout';

const annotationTypes = [
	{ label: 'default', value: 'default' },
	{ label: 'important', value: 'important' },
	{ label: 'quote', value: 'quote' },
	{ label: 'redline', value: 'redline' },
];

export default function ManagingAnnotationsExample() {
	const [annotations, setAnnotations] = useState([]);
	const [annotationType, setAnnotationType] = useState('default');

	const header = (
		<FlexLayout flexDirection="column">
			<FlexLayout alignItems="flex-end">
				<Select
					id="annotation-type"
					label="Annotation type"
					options={annotationTypes}
					value={annotationType}
					onChange={setAnnotationType}
				/>
			</FlexLayout>
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

	const sections = [
		{
			label: 'Selected annotations',
			content: (
				<ContentArea help="Add selected text to annotations.">
					{JSON.stringify(annotations, null, 2)}
				</ContentArea>
			),
			value: 'managing-annotations',
		},
	];

	const docProps = {
		annotations,
		content,
		onAnnotationClick: (annotation) => {
			// eslint-disable-next-line no-alert
			const removeAnnotation = window.confirm(
				'Do you want to remove this annotation?',
			);
			if (removeAnnotation) {
				setAnnotations(annotations.filter(({ id }) => annotation.id !== id));
			}
		},
		onSelectText: (annotation) => {
			const { value } = annotation;
			// eslint-disable-next-line no-alert
			const addAnnotation = window.confirm(
				`Do you want to annotation:\n\n"${
					value.length < 100 ? value : value.slice(0, 100) + '…'
				}"?`,
			);
			if (addAnnotation) {
				setAnnotations([
					...annotations,
					{
						...annotation,
						classNames: [annotationType],
					},
				]);
			}
		},
	};

	return (
		<Layout
			docProps={docProps}
			header={header}
			name="managing-annotations"
			sections={sections}
		/>
	);
}
