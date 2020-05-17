import {
	Annotation,
	AnnotationCallbacks,
	ContentType,
	Optional,
	Plugin,
	SelectedText,
} from 'unified-doc';

export * from 'unified-doc';

export interface Props {
	/** Source string content */
	content: string;
	/** Supported content types (e.g. 'html', 'markdown', 'text') */
	contentType?: ContentType;
	/** Annotations applied relative to the source content */
	annotations?: Annotation[];
	/** Callbacks to capture annotation and related mouse events */
	annotationCallbacks?: Optional<AnnotationCallbacks>;
	/** Optional CSS to style the document */
	className?: string;
	/** Optional rehype plugins can be applied.  Note that the `onSelectText` prop may misbehave if plugins modify the text content of the document. */
	rehypePlugins?: Plugin[];
	/** HTML Sanitize schema (https://github.com/syntax-tree/hast-util-sanitize#schema) */
	sanitizeSchema?: { [key: string]: any };
	/** Callback to capture selected text and mouse up event.  The `SelectedText` extends the `Annotation` object, and can be used with the `annotations` prop in a controlled manner.  Note that this callback may not behave correctly if rehype plugins modify the text content of the document since the callback is applied in relation to the source content. */
	onSelectText?: (selectedText: SelectedText, e?: MouseEvent) => void;
}

export default function Document(props: Props): JSX.Element;
