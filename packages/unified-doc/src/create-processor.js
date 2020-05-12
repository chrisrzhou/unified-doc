import deepmerge from 'deepmerge';
import sanitize from 'hast-util-sanitize';
import gh from 'hast-util-sanitize/lib/github.json';
import html from 'rehype-parse';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';
import text from 'unified-doc-parse-text';

import coerceTextPositions from './utils/coerce-text-positions';

const createPlugin = (transform) => (...args) => (tree) =>
	transform(tree, ...args);

export default function createProcessor(
	contentType = 'text',
	sanitizeSchema = {},
) {
	const processor = unified();

	switch (contentType) {
		case 'markdown':
			processor
				.use(markdown)
				.use(remark2rehype)
				.use(createPlugin(coerceTextPositions));
			break;
		case 'html':
			processor.use(html);
			break;
		case 'text':
		default:
			processor.use(text);
	}

	processor.use(createPlugin(sanitize), deepmerge(gh, sanitizeSchema));

	return processor;
}
