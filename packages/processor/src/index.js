import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
import html from 'rehype-parse';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

const createPlugin = transform => (...args) => tree => transform(tree, ...args);

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
		case 'text':
		default:
			processor.use(html);
	}

	processor.use(extractTextOffsets, extractor);
	processor.use(annotate, annotations, annotationCallbacks);

	return processor;
}
