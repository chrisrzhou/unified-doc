import React, { useState } from 'react';

import { annotations as initialAnnotationsData, content } from '@docs/data';
import { Checkbox, ContentArea, FlexLayout, Text } from '@docs/ui';

import Layout from './layout';

function getId(annotation) {
	return annotation ? annotation.id : '-';
}

const initialEnableLabels = true;
const initialEnableTooltips = false;

export default function AnnotationsExample() {
	const [annotationsData, setAnnotationsData] = useState(
		initialAnnotationsData,
	);
	const [enableLabels, setEnableLabels] = useState(initialEnableLabels);
	const [enableTooltips, setEnableTooltips] = useState(initialEnableTooltips);
	const [hoveredAnnotation, setHoveredAnnotation] = useState(null);
	const [clickedAnnotation, setClickedAnnotation] = useState(null);

	const annotations = annotationsData.map((annotation) => ({
		...annotation,
		label: enableLabels ? annotation.label : undefined,
	}));

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
			</FlexLayout>
			<Text variant="help">
				<b>Hovered annotation:</b> {getId(hoveredAnnotation)}
			</Text>
			<Text variant="help">
				<b>Clicked annotation:</b> {getId(clickedAnnotation)}
			</Text>
		</FlexLayout>
	);

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

	const annotationCallbacks = {
		getTooltipContent: enableTooltips
			? (annotation) => annotation.tooltip
			: undefined,
		onClick: (annotation) => setClickedAnnotation(annotation),
		onMouseEnter: (annotation) => setHoveredAnnotation(annotation),
		onMouseOut: () => setHoveredAnnotation(null),
	};

	const docProps = {
		annotations,
		annotationCallbacks,
		content,
		onSelectText: (annotation) => {
			setAnnotationsData([
				...annotationsData,
				{
					...annotation,
					label: 'User-selected',
					tooltip: `You created "${annotation.value.slice(
						0,
						30,
					)}…" at ${new Date()}`,
					classNames: ['important'],
				},
			]);
		},
	};

	return (
		<Layout
			docProps={docProps}
			header={header}
			name="annotations"
			sections={sections}
		/>
	);
}
