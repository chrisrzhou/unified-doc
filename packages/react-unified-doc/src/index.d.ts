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
	/** An array of annotations to apply to the content */
	annotations?: Annotation[];
	/** Provide optional CSS to style the document */
	className?: string;
	/** Source content represented as a string */
	content: string;
	/** Supported content type ('html', 'markdown', 'text') */
	contentType?: ContentType;
	/** Valid rehype plugins can be applied after annotations.  Note that this will disable the `onSelectText` callback because we can no longer guarantee the relative text offsets if other plugins mutate the tree. */
	rehypePlugins?: Plugin[];
	/** HTML Sanitize schema (see https://github.com/syntax-tree/hast-util-sanitize#schema) */
	sanitizeSchema?: { [key: string]: any };
	/** Renders annotation tooltips when hovering on the annotation */
	getAnnotationTooltip?: (annotation: Annotation) => string;
	/** Callback to capture annotation object and mouse click event */
	onAnnotationClick?: AnnotationCallback;
	/** Callback to capture annotation object and mouse enter event */
	onAnnotationMouseEnter?: AnnotationCallback;
	/** Callback to capture annotation object and mouse leave event */
	onAnnotationMouseLeave?: AnnotationCallback;
	/** Callback to capture selected text and mouse up event */
	onSelectText?: (selectedText: SelectedText, e?: MouseEvent) => void;
}

export default function ReactUnifiedDocument(props: Props): JSX.Element;
