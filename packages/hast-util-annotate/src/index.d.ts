import { Node } from 'unist';

type Optional<T> = {
	[P in keyof T]?: T[P];
};

export interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** If specified, will create anchor links  with provided ID value */
	anchorId?: string;
	/** CSS classname that will be appiled on text content that matches the annotation offsets */
	className?: string;
	/** Unique ID is required for annotation algorithm to work */
	id: string;
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
	clickAnnotation: AnnotationCallback;
	hoverAnnotation: AnnotationCallback;
}

export type OptionalAnnotationCallbacks = Optional<AnnotationCallbacks>;

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
): Node;
