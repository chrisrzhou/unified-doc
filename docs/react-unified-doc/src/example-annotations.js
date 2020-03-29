import React, { useEffect, useState } from 'react';

import { annotations as annotationsData, htmlContent } from './data';
import ExampleLayout from './example-layout';
import { Button, Checkbox, ContentArea, FlexLayout, Text } from '../../ui';

function getId(annotation) {
	return annotation ? annotation.id : '-';
}

function getRandomNumberRange(min = 0, max = 1000) {
	const number1 = Math.floor(Math.random() * (max - min + 1) + min);
	const number2 = Math.floor(Math.random() * (max - min + 1) + min);
	return [Math.min(number1, number2), Math.max(number1, number2)];
}

let currentRandomizeId = 0;

export default function ExampleAnnotations() {
	const [annotations, setAnnotations] = useState(annotationsData);
	const [randomizeId, setRandomizeId] = useState(currentRandomizeId);
	const [enableLabels, setEnableLabels] = useState(false);
	const [enablePermalinks, setEnablePermalinks] = useState(false);
	const [enableTooltips, setEnableTooltips] = useState(false);
	const [hoveredAnnotation, setHoveredAnnotation] = useState();
	const [clickedAnnotation, setClickedAnnotation] = useState();

	useEffect(() => {
		const updatedAnnotations = annotationsData.map(annotation => {
			const label = enableLabels ? annotation.label : undefined;
			const anchor = enablePermalinks;
			let { startOffset, endOffset } = annotation;

			if (currentRandomizeId !== randomizeId) {
				[startOffset, endOffset] = getRandomNumberRange();
				currentRandomizeId = randomizeId;
			}

			return {
				...annotation,
				startOffset,
				endOffset,
				label,
				anchor,
			};
		});
		setAnnotations(updatedAnnotations);
	}, [enableLabels, enablePermalinks, randomizeId]);

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
				<Button onClick={() => setRandomizeId(randomizeId + 1)}>
					Randomize annotations
				</Button>
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
