import React, { useEffect, useState } from 'react';

import { overlappedAnnotations as defaultAnnotations, content } from './data';
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
				sanitizeSchema={{
					attributes: {
						'*': ['className', 'style'],
					},
				}}
				onClickAnnotation={(annotation, _e) => {
					console.log('clicked', annotation);
				}}
				onHoverAnnotation={(annotation, _e) => {
					console.log('hover', annotation);
				}}
				onSelectText={(selection, _e) => {
					console.log(selection);
					setAnnotations([
						...annotations,
						{
							classNames: ['highlight'],
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
