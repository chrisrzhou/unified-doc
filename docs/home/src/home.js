import { navigate } from 'gatsby';
import React, { useState } from 'react';
import 'tippy.js/dist/tippy.css';

import {
	contentTypes,
	hast,
	hastAnnotated,
	annotations as initialAnnotations,
	content,
} from '@docs/data';
import {
	AnimatedTrail,
	Box,
	Button,
	ContentArea,
	FlexLayout,
	Text,
} from '@docs/ui';
import Document from '@packages/unified-doc-react';
import '@packages/unified-doc-react/src/index.css';
import '@docs/doc.css';

import Section from './Section';

const LAST_STEP = 2;

export default function Home() {
	const [annotations, setAnnotations] = useState(initialAnnotations);
	const [step, setStep] = useState(0);

	let nextButtonLabel;
	switch (step) {
		case 0:
			nextButtonLabel = 'Parse content';
			break;
		case 1:
			nextButtonLabel = 'Markup tree';
			break;
		case 2:
			nextButtonLabel = 'Quick Start';
			break;
		default:
			nextButtonLabel = 'Next';
			break;
	}

	const steps = (
		<FlexLayout space="l">
			{step >= 0 && (
				<Section
					description="Accepts any supported content types"
					title="content">
					<AnimatedTrail
						items={contentTypes}
						renderItem={(item) => (
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
						items={[
							hast,
							'apply hast plugins (e.g. annotations)',
							hastAnnotated,
						]}
						renderItem={(item) => (
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
					description="Semantic HTML markup customizable with standard web technologies.  Try selecting text to highlight the document!"
					title="html">
					<Document
						annotations={annotations}
						className="doc-mini"
						content={content}
						contentType="html"
						getAnnotationTooltip={(annotation) => annotation.tooltip}
						onSelectText={(annotation) => {
							setAnnotations([
								...annotations,
								{
									...annotation,
									label: 'User-selected',
									type: 'User-selected',
									classNames: ['important'],
									tooltip: `You created "${annotation.value.slice(
										0,
										30,
									)}…" at ${new Date()}`,
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
			Back
		</Button>
	);

	return (
		<FlexLayout
			flexDirection="column"
			justifyContent="space-between"
			sx={{ height: '70vh' }}>
			{steps}
			<FlexLayout justifyContent="space-between">
				{step > 0 ? backButton : <div />}
				<Button
					onClick={() => {
						if (step === LAST_STEP) {
							navigate('quick-start');
						} else {
							setStep(step + 1);
						}
					}}>
					{nextButtonLabel}
				</Button>
			</FlexLayout>
		</FlexLayout>
	);
}
