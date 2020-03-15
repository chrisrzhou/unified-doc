import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
import deepmerge from 'deepmerge';
import sanitizeUtil from 'hast-util-sanitize';
import gh from 'hast-util-sanitize/lib/github.json';
import html from 'rehype-parse';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

import text from './text-parse';

const createPlugin = transform => (...args) => tree => transform(tree, ...args);

const sanitize = createPlugin(sanitizeUtil);
const annotate = createPlugin(annotateUtil);
const extractTextOffsets = createPlugin(extractTextOffsetsUtil);

export function createProcessor(
	contentType,
	annotations,
	annotationCallbacks,
	extractor,
) {
	const processor = unified();

	switch (contentType) {
		case 'markdown':
			processor.use(markdown).use(remark2rehype);
			break;
		case 'html':
			processor.use(html);
			break;
		case 'text':
		default:
			// @ts-ignore: [help-needed] to type this correctly
			processor.use(text);
	}

	processor.use(
		sanitize,
		deepmerge(gh, { attributes: { '*': ['className', 'style'] } }),
	);

	if (extractor) {
		processor.use(extractTextOffsets, extractor);
	}

	if (annotations) {
		processor.use(annotate, annotations, annotationCallbacks);
	}

	return processor;
}
