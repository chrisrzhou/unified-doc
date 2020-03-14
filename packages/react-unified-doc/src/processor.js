import annotateUtil from '@unified-doc/hast-util-annotate';
import extractTextOffsetsUtil from '@unified-doc/hast-util-extract-text-offsets';
import { createElement } from 'react';
import html from 'rehype-parse';
import rehype2react from 'rehype-react';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

import { annotationTypes } from './constants';

const createPlugin = transform => (...args) => tree => transform(tree, ...args);

const annotate = createPlugin(annotateUtil);
const extractTextOffsets = createPlugin(extractTextOffsetsUtil);

export default function createProcessor({
	annotations = [],
	callbacks = {},
	extractor,
	fileType,
	rehypePlugins = [],
}) {
	const processor = unified();
	switch (fileType) {
		case 'markdown':
			processor.use(markdown).use(remark2rehype);
			break;
		case 'text':
		case 'html':
		default:
			processor.use(html);
	}

	const styledAnnotations = annotations.map(annotation => {
		const classNames = annotation.classNames || [];
		if (annotationTypes.includes(annotation.type)) {
			classNames.push(`annotation-${annotation.type}`);
		}

		return {
			...annotation,
			classNames,
		};
	});

	processor.use(extractTextOffsets, extractor);
	processor.use(annotate, styledAnnotations, callbacks);

	rehypePlugins.forEach(([plugin, ...args]) => {
		processor.use(plugin, ...args);
	});

	processor.use(rehype2react, { createElement });
	return processor;
}
