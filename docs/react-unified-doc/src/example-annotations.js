import React, { useState } from 'react';

import Layout from './layout';
import { annotations as initialAnnotationsData, content } from '../../src/data';
import { Checkbox, ContentArea, FlexLayout, Text } from '../../ui';

function getId(annotation) {
	return annotation ? annotation.id : '-';
}

const initialEnableLabels = true;
const initialEnablePermalinks = false;
const initialEnableTooltips = false;

export default function ExampleAnnotations() {
	const [annotationsData, setAnnotationsData] = useState(
		initialAnnotationsData,
	);
	const [enableLabels, setEnableLabels] = useState(initialEnableLabels);
	const [enablePermalinks, setEnablePermalinks] = useState(
		initialEnablePermalinks,
	);
	const [enableTooltips, setEnableTooltips] = useState(initialEnableTooltips);
	const [hoveredAnnotation, setHoveredAnnotation] = useState(null);
	const [clickedAnnotation, setClickedAnnotation] = useState(null);

	const annotations = annotationsData.map((annotation) => ({
		...annotation,
		anchor: enablePermalinks,
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
		content,
		getAnnotationTooltip: enableTooltips
			? (annotation) => annotation.tooltip
			: undefined,
		onAnnotationClick: (annotation) => setClickedAnnotation(annotation),
		onAnnotationMouseEnter: (annotation) => setHoveredAnnotation(annotation),
		onAnnotationMouseLeave: () => setHoveredAnnotation(null),
		onSelectText: (annotation) => {
			setAnnotationsData([
				...annotationsData,
				{
					...annotation,
					anchor: enablePermalinks,
					label: 'User-selected',
					tooltip: `You created "${annotation.value.slice(
						0,
						30,
					)}…" at ${new Date()}`,
					classNames: ['custom-highlight'],
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
