import React, { useState } from 'react';

import Layout from './layout';
import { content } from '../../src/data';
import {
	Annotations,
	Checkbox,
	ContentArea,
	FlexLayout,
	Select,
} from '../../ui';

const annotationTypes = [
	{ label: 'default', value: 'default' },
	{ label: 'custom-highlight', value: 'custom-highlight' },
	{ label: 'redline', value: 'redline' },
];

export default function ExampleSelectingText() {
	const [annotations, setAnnotations] = useState([]);
	const [annotationType, setAnnotationType] = useState('default');
	const [enablePermalinks, setEnablePermalinks] = useState(false);

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
				<Checkbox
					id="enable-permalinks"
					label="Enable permalinks"
					value={enablePermalinks}
					onChange={setEnablePermalinks}
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
			value: 'selecting-text',
		},
	];

	const docProps = {
		annotations,
		content,
		onSelectText: (annotation) => {
			setAnnotations([
				...annotations,
				{
					...annotation,
					anchor: enablePermalinks,
					label: annotationType,
					classNames: annotationType ? [annotationType] : [],
				},
			]);
		},
	};

	return (
		<Layout
			docProps={docProps}
			header={header}
			name="selecting-text"
			sections={sections}
		/>
	);
}
