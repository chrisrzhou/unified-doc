import { Node } from 'unist';

type Optional<T> = {
	[P in keyof T]?: T[P];
};

export interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** If specified, will create anchor links  with provided ID value */
	anchorId?: string;
	/** Array of CSS classnames that will be appiled on text content that matches the annotation offsets */
	classNames?: string[];
	/** End offset relative to the source content */
	endOffset: number;
	/** Start offset relative to the source content */
	startOffset: number;
}

export type AnnotationCallback = (
	annotation: Annotation,
	event?: MouseEvent,
) => void;

interface AnnotationCallbacks {
	onClickAnnotation: AnnotationCallback;
	onHoverAnnotation: AnnotationCallback;
}

export type OptionalAnnotationCallbacks = Optional<AnnotationCallbacks>;

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
): Node;
