import React from 'react';

import Layout from './layout';
import { content } from '../../src/data';

function Diff() {
	const docProps = {
		annotations: [],
		content,
	};

	return <Layout docProps={docProps} name="diff" />;
}

export default Diff;
