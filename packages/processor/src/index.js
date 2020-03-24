import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
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
const annotate = createPlugin(annotateUtil);
const extractTextOffsets = createPlugin(extractTextOffsetsUtil);

export function createProcessor(
	contentType = 'text',
	annotations = [],
	annotationCallbacks = {},
	options = {},
) {
	const { extractor, sanitizeSchema } = options;

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

	if (sanitizeSchema) {
		processor.use(sanitize, deepmerge(gh, sanitizeSchema));
	}

	if (extractor) {
		processor.use(extractTextOffsets, extractor);
	}

	if (annotations) {
		processor.use(annotate, annotations, annotationCallbacks);
	}

	return processor;
}
