import React from 'react';

import Layout from './layout';
import { content } from '../../src/data';

function Comments() {
	const docProps = {
		annotations: [],
		content,
	};

	return <Layout docProps={docProps} name="comments" />;
}

export default Comments;
