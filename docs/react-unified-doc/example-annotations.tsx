import React, { useEffect, useState } from 'react';

import { annotations as defaultAnnotations, content } from './data';
import ReactUnifiedDoc from '../../packages/react-unified-doc/src';

import './doc.css';
import '../../packages/react-unified-doc/src/index.css';

export default function ExampleAnnotations(): JSX.Element {
	const [annotations, setAnnotations] = useState(defaultAnnotations);

	// Force-scroll to hash if it exists
	useEffect(() => {
		const { hash } = document.location;
		if (hash) {
			document.location.hash = hash;
		}
	}, []);

	const contentType = 'text';

	return (
		<div className={contentType === 'text' ? 'doc' : undefined}>
			<ReactUnifiedDoc
				annotations={annotations}
				content={content}
				contentType={contentType}
				onClickAnnotation={(annotation, e) =>
					console.log('clicked', annotation, e)
				}
				onHoverAnnotation={(annotation, e) =>
					console.log('hover', annotation, e)
				}
				onSelectText={(selection, e) => {
					console.log(selection, e);
					setAnnotations([
						{
							type: 'highlight',
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
