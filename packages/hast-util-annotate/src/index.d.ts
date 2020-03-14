import { Node } from 'unist';

export interface Annotation {
	[key: string]: any; // Additional annotation data
	startOffset: number;
	endOffset: number;
	classNames?: string[];
}

export type Optional<T> = {
	[P in keyof T]?: T[P];
};

export type Callback = (annotation: Annotation, event: MouseEvent) => void;

export interface Callbacks {
	onClickAnnotation: Callback;
	onHoverAnnotation: Callback;
}

export function splitText(
	node: Node,
	annotation: Annotation,
): null | [string, string, string];

export default function annotate(
	tree: Node,
	annotations: Annotation[],
	callbacks: Optional<Callbacks>,
): Node;
