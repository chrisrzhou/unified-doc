import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { annotations as defaultAnnotations, content } from './data';
import ReactUnifiedDoc from '../../packages/react-unified-doc/src';

import './doc.css';

export default function ExampleAnnotations(): JSX.Element {
	const [annotations, setAnnotations] = useState(defaultAnnotations);

	// Force-scroll to hash if it exists
	useEffect(() => {
		const { hash } = document.location;
		if (hash) {
			document.location.hash = hash;
		}
	}, []);

	const contentType = 'html';

	return (
		<div className={contentType === 'text' ? 'doc' : undefined}>
			<ReactUnifiedDoc
				annotations={annotations}
				content={content}
				contentType={contentType}
				getAnnotationTooltip={annotation => {
					return JSON.stringify(annotation, null, 2);
				}}
				sanitizeSchema={{
					attributes: {
						'*': ['className', 'style'],
					},
				}}
				onAnnotationClick={annotation => {
					// Console.log('clicked', annotation);
				}}
				onAnnotationHover={annotation => {
					// Console.log('hover', annotation);
				}}
				onSelectText={(selection, _e) => {
					console.log(selection);
					setAnnotations([
						...annotations,
						{
							id: uuidv4(),
							className: 'highlight',
							label: 'selected',
							endOffset: selection.endOffset,
							startOffset: selection.startOffset,
							value: selection.value,
						},
					]);
				}}
			/>
		</div>
	);
}
