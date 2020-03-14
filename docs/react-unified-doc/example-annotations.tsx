import React, { useState } from 'react';

import { content } from './data';
import ReactUnifiedDoc from '../../packages/react-unified-doc/src';

export default function ExampleAnnotations(): JSX.Element {
	const [annotations, setAnnotations] = useState([]);
	return (
		<div>
			<ReactUnifiedDoc
				annotations={annotations}
				content={content}
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
