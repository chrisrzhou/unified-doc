import {
	Annotation,
	AnnotationCallback,
} from '@unified-doc/hast-util-annotate';
import { ContentType } from '@unified-doc/processor';
import { Plugin } from 'unified';

export { Annotation, AnnotationCallback, ContentType, Plugin };

export interface SelectedText extends Annotation {
	value: string;
}

export interface Props {
	/** An array of annotation objects to apply to the document */
	annotations: Annotation[];
	/** Source content represented as a string */
	content: string;
	/** Supported content type ('html', 'markdown', 'text') */
	contentType?: ContentType;
	/** Callback to capture annotation object and mouse click event */
	onClickAnnotation?: AnnotationCallback;
	/** Callback to capture annotation object and mouse hover event */
	onHoverAnnotation?: AnnotationCallback;
	/** Callback to capture selected text and mouse up event */
	onSelectText?: (selectedText: SelectedText, e?: MouseEvent) => void;
	/** Valid rehype plugins to run after annotations are applied */
	rehypePlugins?: Plugin[];
	/** HTML Sanitize schema (see https://github.com/syntax-tree/hast-util-sanitize#schema) */
	sanitizeSchema?: { [key: string]: any };
}

export default function ReactUnifiedDocument(props: Props): JSX.Element;
