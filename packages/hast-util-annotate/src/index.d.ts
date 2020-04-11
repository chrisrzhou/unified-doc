import { Node } from 'unist';

type Optional<T> = {
	[P in keyof T]?: T[P];
};

export interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** Unique ID is required for annotation algorithm to work.  It is also used to uniquely assign ID values to generated <mark /> nodes which is convenient for selecting the element itself. */
	id: string;
	/** Start offset relative to the source content */
	startOffset: number;
	/** End offset relative to the source content */
	endOffset: number;
	/** If true, will update the `location.hash` using the annotation ID as the hash.  Useful for creating annotation permalinks. Note that this disables the annotation `onClick` handler since the intention is explicit to create anchor links for the `onClick` event. */
	anchor?: boolean;
	/** CSS classnames that will be applied on the annotated nodes */
	classNames?: string[];
	/** If true, will add the value to the `label` tag attribute.  Useful for displaying the label with custom CSS:before selectors. */
	label?: string;
	/** Apply custom styles to the annotated node. Note that use of `classNames` prop is preferred. */
	style?: any;
}

export type AnnotationCallback = (
	annotation: Annotation,
	event?: MouseEvent,
) => void;

interface AnnotationCallbacks {
	onClick: AnnotationCallback;
	onMouseEnter: AnnotationCallback;
	onMouseOut: AnnotationCallback;
}

export type OptionalAnnotationCallbacks = Optional<AnnotationCallbacks>;

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
): Node;
