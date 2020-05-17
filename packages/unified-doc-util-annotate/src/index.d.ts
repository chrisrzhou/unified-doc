import { Node } from 'unist';

export type Optional<T> = {
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
	getTooltipContent: (annotation: Annotation) => string;
	onClick: AnnotationCallback;
	onMouseEnter: AnnotationCallback;
	onMouseOut: AnnotationCallback;
}

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: Optional<AnnotationCallbacks>,
): Node;
