import annotate from '@unified-doc/rehype-annotate';
import { createElement } from 'react';
import html from 'rehype-parse';
import markdown from 'remark-parse';
import rehype2react from 'rehype-react';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

export function getProcessor({
	fileType,
	highlightClassName,
	highlights = [],
	onClickHighlight,
	onMouseOverHighlight,
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
	processor.use(annotate, {
		highlightClassName,
		highlights,
		onClickHighlight,
		onMouseOverHighlight,
	});
	processor.use(rehype2react, { createElement });
	return processor;
}

export function parseContent(content, { fileType, plugins, highlights }) {
	const processor = getProcessor({ fileType, plugins, highlights });
	return processor.runSync(processor.parse(content));
}
