import React from 'react';
import toc from 'rehype-toc';

import { annotations, htmlContent } from './data';
import ExampleLayout from './example-layout';
import ReactUnifiedDoc from './react-unified-doc';

export default function ExampleSelectingText(): JSX.Element {
	return (
		<ExampleLayout content={htmlContent}>
			<ReactUnifiedDoc
				annotations={annotations}
				content={htmlContent}
				contentType="html"
				rehypePlugins={[toc]}
			/>
		</ExampleLayout>
	);
}
