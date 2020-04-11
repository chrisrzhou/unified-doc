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
	/** Source content represented as a string */
	content: string;
	/** Supported content type ('html', 'markdown', 'text') */
	contentType?: ContentType;
	/** An array of annotations to apply to the content */
	annotations?: Annotation[];
	/** Provide optional CSS to style the document */
	className?: string;
	/** Valid rehype plugins can be applied after annotations.  Note that this will disable the `onSelectText` callback because we can no longer guarantee accurate text positions since other plugins may mutate the tree. */
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
	/** Callback to capture selected text and mouse up event.  The `SelectedText` extends the `Annotation` object, and can be used to updated the `annotations` prop in a controlled manner.  This callback is disabled if `rehypePlugins` are specified. */
	onSelectText?: (selectedText: SelectedText, e?: MouseEvent) => void;
}

export default function Document(props: Props): JSX.Element;
