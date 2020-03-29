import React, { useState } from 'react';

import { annotations as annotationsData, htmlContent } from './data';
import ExampleLayout from './example-layout';
import { Annotation } from './react-unified-doc';
import { Checkbox, ContentArea, FlexLayout, Text } from './ui';

export default function ExampleAnnotations(): JSX.Element {
	const [enableLabels, setEnableLabels] = useState(false);
	const [enableTooltips, setEnableTooltips] = useState(false);
	const [enablePermalinks, setEnablePermalinks] = useState(false);
	const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation>();
	const [clickedAnnotation, setClickedAnnotation] = useState<Annotation>();

	const header = (
		<FlexLayout flexDirection="column" space="s">
			<FlexLayout>
				<Checkbox
					label="Enable labels"
					value={enableLabels}
					onChange={setEnableLabels}
				/>
				<Checkbox
					label="Enable Tooltips"
					value={enableTooltips}
					onChange={setEnableTooltips}
				/>
				<Checkbox
					label="Enable permalinks"
					value={enablePermalinks}
					onChange={setEnablePermalinks}
				/>
			</FlexLayout>
			<Text variant="help">
				<b>Hovered annotation:</b>{' '}
				{hoveredAnnotation ? hoveredAnnotation.id : '-'}
			</Text>
			<Text variant="help">
				<b>Clicked annotation:</b>{' '}
				{clickedAnnotation ? clickedAnnotation.id : '-'}
			</Text>
		</FlexLayout>
	);

	const annotations = annotationsData.map(annotation => ({
		...annotation,
		label: enableLabels ? annotation.label : undefined,
		anchor: enablePermalinks,
	}));

	const sections = [
		{
			label: 'Annotations',
			content: (
				<ContentArea help="Annotations are simple and declarative.">
					{JSON.stringify(annotations, null, 2)}
				</ContentArea>
			),
			value: 'annotations',
		},
	];

	const docProps = {
		annotations,
		content: htmlContent,
		getAnnotationTooltip: enableTooltips
			? annotations => annotations.tooltip
			: undefined,
		onAnnotationClick: annotation => setClickedAnnotation(annotation),
		onAnnotationMouseEnter: annotation => setHoveredAnnotation(annotation),
		onAnnotationMouseLeave: _annotation => setHoveredAnnotation(null),
	};

	return (
		<ExampleLayout
			docProps={docProps}
			header={header}
			name="annotations"
			sections={sections}
		/>
	);
}
