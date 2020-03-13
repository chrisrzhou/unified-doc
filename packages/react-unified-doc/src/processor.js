import annotate from '@unified-doc/rehype-annotate';
import textOffsets from '@unified-doc/rehype-text-offsets';
import { createElement } from 'react';
import html from 'rehype-parse';
import rehype2react from 'rehype-react';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

import { annotationTypes } from './constants';

export default function createProcessor({
	annotations = [],
	callbacks = {},
	extractTextOffsets,
	fileType,
	plugins = [],
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

	plugins.forEach(({ plugin, options }) => {
		processor.use(plugin, options);
	});

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

	processor.use(textOffsets, { extractTextOffsets });
	processor.use(annotate, {
		annotations: styledAnnotations,
		callbacks,
	});
	processor.use(rehype2react, { createElement });
	return processor;
}
