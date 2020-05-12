import { Processor } from 'unified';

import { ContentType } from './types';

export default function createProcessor(
	contentType?: ContentType,
	sanitizeSchema?: {
		[key: string]: any;
	},
): Processor;
