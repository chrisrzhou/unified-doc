import { Node } from 'unist';

type Optional<T> = {
	[P in keyof T]?: T[P];
};

export interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** Unique ID is required for annotation algorithm to work */
	id: string;
	/** Start offset relative to the source content */
	startOffset: number;
	/** End offset relative to the source content */
	endOffset: number;
	/** If provided, will create <a /> instead of <mark /> tags and use the annotation ID as the href.  Useful for creating annotation permalinks. */
	anchor?: boolean;
	/** CSS classnames that will be applied on the annotated nodes */
	classNames?: string[];
	/** If provided, will add the value to the "label" tag attribute.  Useful for displaying the label with custom CSS:before selectors. */
	label?: string;
	/** Apply custom styles to the annotated node. Note that use of classNames prop is preferred. */
	style?: { [key: string]: any };
}

export type AnnotationCallback = (
	annotation: Annotation,
	event?: MouseEvent,
) => void;

interface AnnotationCallbacks {
	clickAnnotation: AnnotationCallback;
	hoverAnnotation: AnnotationCallback;
}

export type OptionalAnnotationCallbacks = Optional<AnnotationCallbacks>;

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
): Node;
