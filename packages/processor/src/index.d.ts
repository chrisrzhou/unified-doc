import { Processor } from 'unified';

export type ContentType = 'html' | 'markdown' | 'text';

export function createProcessor(
	contentType?: ContentType,
	sanitizeSchema?: {
		[key: string]: any;
	},
): Processor;
