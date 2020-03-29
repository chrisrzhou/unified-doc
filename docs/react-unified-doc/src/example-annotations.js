import React, { useState } from 'react';

import { annotations as annotationsData, htmlContent } from './data';
import ExampleLayout from './example-layout';
import { Checkbox, ContentArea, FlexLayout, Text } from './ui';

function getId(annotation) {
	return annotation ? annotation.id : '-';
}

export default function ExampleAnnotations() {
	const [enableLabels, setEnableLabels] = useState(false);
	const [enableTooltips, setEnableTooltips] = useState(false);
	const [enablePermalinks, setEnablePermalinks] = useState(false);
	const [hoveredAnnotation, setHoveredAnnotation] = useState();
	const [clickedAnnotation, setClickedAnnotation] = useState();

	const header = (
		<FlexLayout flexDirection="column" space="s">
			<FlexLayout>
				<Checkbox
					id="enable-labels"
					label="Enable labels"
					value={enableLabels}
					onChange={setEnableLabels}
				/>
				<Checkbox
					id="enable-tooltips"
					label="Enable Tooltips"
					value={enableTooltips}
					onChange={setEnableTooltips}
				/>
				<Checkbox
					id="enable-permalinks"
					label="Enable permalinks"
					value={enablePermalinks}
					onChange={setEnablePermalinks}
				/>
			</FlexLayout>
			<Text variant="help">
				<b>Hovered annotation:</b> {getId(hoveredAnnotation)}
			</Text>
			<Text variant="help">
				<b>Clicked annotation:</b> {getId(clickedAnnotation)}
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
			? annotation => annotation.tooltip
			: undefined,
		onAnnotationClick: annotation => setClickedAnnotation(annotation),
		onAnnotationMouseEnter: annotation => setHoveredAnnotation(annotation),
		onAnnotationMouseLeave: () => setHoveredAnnotation(null),
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
