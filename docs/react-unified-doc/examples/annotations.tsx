import ReactUnifiedDoc from '../../../packages/react-unified-doc/src';
import React, { useState } from 'react';
import { Box, Checkbox, Flex, Label } from 'theme-ui';

import { annotations as initialAnnotations, htmlContent } from './data';
import Layout from './layout';

import './doc.css';

export default function AnnotationsExample(): JSX.Element {
	const [showTooltips, setShowTooltips] = useState(false);
	const [showLabels, setShowLabels] = useState(false);
	const [enableAnchors, setEnableAnchors] = useState(false);
	const [clickedAnnotation, setClickedAnnotation] = useState(null);
	const [hoveredAnnotation, setHoveredAnnotation] = useState(null);

	const annotations = initialAnnotations.map(annotation => {
		return {
			...annotation,
			anchor: enableAnchors,
			label: showLabels ? annotation.label : undefined,
		};
	});

	const getAnnotationTooltip = showTooltips
		? annotations => annotations.tooltip
		: undefined;

	return (
		<Box>
			<Flex>
				<Label sx={{ flex: '0 0 200px' }}>
					<Checkbox
						checked={showTooltips}
						onChange={_e => setShowTooltips(!showTooltips)}
					/>
					Show tooltips
				</Label>
				<Label ml={4} sx={{ flex: '0 0 200px' }}>
					<Checkbox
						checked={showLabels}
						onChange={_e => {
							setShowLabels(!showLabels);
						}}
					/>
					Show labels
				</Label>
				<Label ml={4} sx={{ flex: '0 0 200px' }}>
					<Checkbox
						checked={enableAnchors}
						onChange={_e => {
							setEnableAnchors(!enableAnchors);
						}}
					/>
					Enable Anchors
				</Label>
			</Flex>
			<p>
				<b>Active annotation</b>:{' '}
				{hoveredAnnotation ? hoveredAnnotation.id : '-'}
				<br />
				<b>Clicked annotation</b>:{' '}
				{clickedAnnotation ? clickedAnnotation.id : '-'}
			</p>
			<Layout
				content={htmlContent}
				rightContentTitle="Annotations"
				rightContent={JSON.stringify(annotations, null, 2)}>
				<ReactUnifiedDoc
					annotations={annotations}
					content={htmlContent}
					contentType="html"
					getAnnotationTooltip={getAnnotationTooltip}
					onAnnotationClick={annotation => setClickedAnnotation(annotation)}
					onAnnotationMouseEnter={annotation =>
						setHoveredAnnotation(annotation)
					}
					onAnnotationMouseLeave={_annotation => setHoveredAnnotation(null)}
				/>
			</Layout>
		</Box>
	);
}
