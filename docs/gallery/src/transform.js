import React from 'react';

import Layout from './layout';
import { content } from '../../src/data';

function Transform() {
	const docProps = {
		annotations: [],
		content,
	};

	return <Layout docProps={docProps} name="transform" />;
}

export default Transform;
