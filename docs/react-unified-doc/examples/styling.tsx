import ReactUnifiedDoc from '../../../packages/react-unified-doc/src';
import React from 'react';
import toc from 'rehype-toc';

import { annotations, htmlContent } from './data';
import Layout from './layout';

export default function StylingExample(): JSX.Element {
	return (
		<Layout content={htmlContent}>
			<ReactUnifiedDoc
				annotations={annotations}
				content={htmlContent}
				contentType="html"
				rehypePlugins={[toc]}
			/>
		</Layout>
	);
}
