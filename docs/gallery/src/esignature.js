import React from 'react';

import Layout from './layout';
import { content } from '../../src/data';

function ESignature() {
	const docProps = {
		annotations: [],
		content,
	};

	return <Layout docProps={docProps} name="esignature" />;
}

export default ESignature;
