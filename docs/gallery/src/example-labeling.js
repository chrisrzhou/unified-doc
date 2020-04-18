import React from 'react';

import Layout from './layout';
import { content } from '../../src/data';

function ExampleLabeling() {
	const annotationsData = {
		uuid1: {
			id: 'uuid1',
			startOffset: 100,
			endOffset: 500,
			replaceValue: 'Protagonist',
		},
		uuid2: {
			id: 'uuid2',
			startOffset: 300,
			endOffset: 500,
			replaceValue: 'Food',
		},
		uuid3: {
			id: 'uuid3',
			startOffset: 1000,
			endOffset: 5000,
			replaceValue: 'Animal',
		},
	};

	const docProps = {
		annotations: Object.values(annotationsData),
		content,
	};

	return <Layout docProps={docProps} name="labeling" />;
}

export default ExampleLabeling;
