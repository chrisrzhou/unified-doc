import React, { useState } from 'react';

import { contentTypes, hast, hastAnnotated } from './data';
import Section from './section';
import {
	AnimatedTrail,
	Box,
	Button,
	ContentArea,
	FlexLayout,
	Text,
} from '../ui';
import ReactUnifiedDocument from '../react-unified-doc/src/react-unified-doc';
import {
	annotations as initialAnnotations,
	content,
} from '../react-unified-doc/src/data';
import ExampleAnnotations from '../react-unified-doc/src/example-annotations';

import './doc.css';

const LAST_STEP = 3;

export default function Home() {
	const [annotations, setAnnotations] = useState(initialAnnotations);
	const [step, setStep] = useState(0);

	let nextButtonLabel;
	switch (step) {
		case 0:
			nextButtonLabel = 'Parse content';
			break;
		case 1:
			nextButtonLabel = 'Render tree';
			break;
		case 2:
			nextButtonLabel = 'Demo';
			break;
		default:
			nextButtonLabel = 'Next';
			break;
	}

	const steps = (
		<FlexLayout space="l">
			{step >= 0 && (
				<Section
					description="Accepts the following supported content types"
					title="content">
					<AnimatedTrail
						items={contentTypes}
						renderItem={item => (
							<Text
								bg="wash"
								color="black1"
								px="l"
								py="m"
								sx={{
									fontFamily: 'monospace',
									fontSize: 's',
									fontWeight: 'bold',
									textAlign: 'center',
								}}>
								{item.filename}
								<Text color="black3">.{item.contentType}</Text>
							</Text>
						)}
					/>
				</Section>
			)}
			{step >= 1 && (
				<Section
					description="Source content is parsed into a unified hast syntax tree"
					title="hast">
					<AnimatedTrail
						items={[hast, 'apply annotations: [a1, a2, a3, …]', hastAnnotated]}
						renderItem={item => (
							<Box sx={{ maxHeight: '20vh', overflow: 'auto' }}>
								<ContentArea>{JSON.stringify(item, null, 2)}</ContentArea>
							</Box>
						)}
					/>
				</Section>
			)}
			{step >= 2 && (
				<Section
					grow
					description="Semantic HTML markup customizable with standard web technologies and rehype plugins"
					title="html">
					<ReactUnifiedDocument
						annotations={annotations}
						className="doc-mini"
						content={content}
						contentType="html"
						getAnnotationTooltip={annotation => annotation.tooltip}
						onSelectText={annotation => {
							setAnnotations([
								...annotations,
								{
									...annotation,
									label: 'User-selected',
									classNames: ['custom-highlight'],
									tooltip: `You created "${annotation.value.slice(
										0,
										30,
									)}…" on ${new Date()}`,
								},
							]);
						}}
					/>
				</Section>
			)}
		</FlexLayout>
	);

	const backButton = (
		<Button
			variant="secondary"
			sx={{ alignSelf: 'flex-start' }}
			onClick={() => {
				setStep(step - 1);
				setAnnotations(initialAnnotations);
			}}>
			{step === LAST_STEP ? 'Back to overview' : 'Back'}
		</Button>
	);

	return (
		<FlexLayout
			flexDirection="column"
			justifyContent="space-between"
			style={{ height: '70vh' }}>
			{step === LAST_STEP && backButton}
			{step < LAST_STEP ? steps : <ExampleAnnotations />}
			{step < LAST_STEP && (
				<FlexLayout justifyContent="space-between">
					{step > 0 ? backButton : <div />}
					<Button onClick={() => setStep(step + 1)}>{nextButtonLabel}</Button>
				</FlexLayout>
			)}
		</FlexLayout>
	);
}
