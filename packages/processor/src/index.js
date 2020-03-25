import text from '@unified-doc/text-parse';
import deepmerge from 'deepmerge';
import sanitizeUtil from 'hast-util-sanitize';
import gh from 'hast-util-sanitize/lib/github.json';
import html from 'rehype-parse';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

import coerceTextPositionsUtil from './hast-util-coerce-text-positions';

const createPlugin = transform => (...args) => tree => transform(tree, ...args);

const coerceTextPositions = createPlugin(coerceTextPositionsUtil);
const sanitize = createPlugin(sanitizeUtil);

export function createProcessor(contentType = 'text', sanitizeSchema = {}) {
	const processor = unified();

	switch (contentType) {
		case 'markdown':
			processor
				.use(markdown)
				.use(remark2rehype)
				.use(coerceTextPositions);
			break;
		case 'html':
			processor.use(html);
			break;
		case 'text':
		default:
			processor.use(text);
	}

	processor.use(sanitize, deepmerge(gh, sanitizeSchema));

	return processor;
}
