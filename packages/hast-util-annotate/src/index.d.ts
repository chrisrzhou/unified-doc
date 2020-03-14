import { Node } from 'unist';

type Optional<T> = {
	[P in keyof T]?: T[P];
};

export interface Annotation {
	/** Additional annotation data */
	[key: string]: any;
	/** Start offset relative to the source content */
	startOffset: number;
	/** End offset relative to the source content */
	endOffset: number;
	/** Array of CSS classnames that will be appiled on text content that matches the annotation offsets */
	classNames?: string[];
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

export function splitText(
	node: Node,
	annotation: Annotation,
): null | [string, string, string];

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
): Node;
